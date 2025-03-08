import { BasePayload, PayloadRequest } from "payload"
import { UserNotFound } from "../errors/consoleErrors.js"
import { AccountInfo } from "../../types.js"
import { hashCode } from "../utils/hash.js"
import {
  createSessionCookies,
  invalidateOAuthCookies,
} from "../utils/cookies.js"

type Collections = {
  accountsCollectionSlug: string
  usersCollectionSlug: string
}

export class PayloadSession {
  readonly #collections: Collections
  readonly #successPath: string | undefined
  readonly #allowSignUp: boolean
  constructor(
    collections: Collections,
    allowSignUp?: boolean,
    successPath?: string,
  ) {
    this.#collections = collections
    this.#allowSignUp = !!allowSignUp
    this.#successPath = successPath
  }
  async #upsertAccount(
    accountInfo: AccountInfo,
    scope: string,
    issuerName: string,
    payload: BasePayload,
  ) {
    let userID: string | number

    const userQueryResults = await payload.find({
      collection: this.#collections.usersCollectionSlug,
      where: {
        email: {
          equals: accountInfo.email,
        },
      },
    })

    if (userQueryResults.docs.length === 0) {
      if (!this.#allowSignUp) {
        throw new UserNotFound()
      }

      const newUser = await payload.create({
        collection: this.#collections.usersCollectionSlug,
        data: {
          email: accountInfo.email,
          emailVerified: true,
          password: hashCode(accountInfo.email + payload.secret).toString(),
        },
      })
      userID = newUser.id
    } else {
      userID = userQueryResults.docs[0].id as string
    }

    const accounts = await payload.find({
      collection: this.#collections.accountsCollectionSlug,
      where: {
        sub: { equals: accountInfo.sub },
      },
    })
    const data: Record<string, unknown> = {
      scope,
      name: accountInfo.name,
      picture: accountInfo.picture,
    }

    // // Add passkey payload for auth
    if (issuerName === "Passkey" && accountInfo.passKey) {
      data["passkey"] = {
        ...accountInfo.passKey,
      }
    }

    if (accounts.docs.length > 0) {
      data["sub"] = accountInfo.sub
      data["issuerName"] = issuerName
      data["user"] = userID
      await payload.update({
        collection: this.#collections.accountsCollectionSlug,
        where: {
          id: {
            equals: accounts.docs[0].id,
          },
        },
        data,
      })
    } else {
      data["sub"] = accountInfo.sub
      data["issuerName"] = issuerName
      data["user"] = userID
      await payload.create({
        collection: this.#collections.accountsCollectionSlug,
        data,
      })
    }
    return userID
  }
  async createSession(
    accountInfo: AccountInfo,
    scope: string,
    issuerName: string,
    request: PayloadRequest,
  ) {
    const { payload } = request

    const userID = await this.#upsertAccount(
      accountInfo,
      scope,
      issuerName,
      payload,
    )

    const fieldsToSign = {
      id: userID,
      email: accountInfo.email,
      collection: this.#collections.usersCollectionSlug,
    }

    let cookies: string[] = []
    cookies = [
      ...(await createSessionCookies(
        `${payload.config.cookiePrefix!}-token`,
        payload.secret,
        fieldsToSign,
      )),
    ]
    cookies = invalidateOAuthCookies(cookies)

    let redirectURL = payload.getAdminURL()
    if (this.#successPath) {
      const newURL = new URL(payload.getAdminURL())
      newURL.pathname = this.#successPath
      redirectURL = newURL.toString()
    }
    const res = new Response(null, {
      status: 302,
      headers: {
        Location: redirectURL,
      },
    })

    cookies.forEach((cookie) => {
      res.headers.append("Set-Cookie", cookie)
    })
    return res
  }
}
