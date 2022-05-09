import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { isAuthorized } from "../tokenFunctions";
import { Request, Response } from 'express'

export async function updatePro (req: Request, res: Response) {
    if (!req.headers.cookie) {
        return res.status(401).send('no cookies')
    }
    if (!isAuthorized(req)) {
        return res.status(401).send('invaild user')
    }
    if (await prisma.users.findFirst({where: {nickname: req.body.nickname}})) {
        return res.status(403).send('nickname exists')
    }
    const accsessTokenData: any = isAuthorized(req)
    const userInfo = Object.assign({}, req.body)
    await prisma.users.updateMany({
        where: {email: accsessTokenData.email},
        data: userInfo
    })
    return res.status(200).send(`${userInfo.nickname} change ok`)
}