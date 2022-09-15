import express from 'express';
import { PrismaClient } from '@prisma/client';
import { convertHoursStringToMinutes } from '../prisma/src/utils/convert';

const app = express();

app.use(express.json());

const prisma = new PrismaClient({
    log: ['query']
});

app.get('/games', async (req,res) => {
    const games = await prisma.game.findMany({
        include:{
            _count:{
                select:{
                    ads: true
                }
            }
        }
    });
    return res.json(games);
});

app.post('/games/:id/ads',async(req,res)=>{
    const gameId = req.params.id;
    const body: any = req.body;

    const ad = await prisma.ad.create({
        data:{
            gameId,
            name: body.name,
            yersPlaying: body.yersPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHoursStringToMinutes(body.hourStart),
            hourEnd: convertHoursStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    });
    return res.status(201).json(ad);
});

app.get('/games/:id/ads', async (req,res)=>{
    const id = req.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yersPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId: id
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(",")
        }
    }));
});

app.get('/ads/:id/discord',async (req,res)=>{
    const adId = req.params.id;
    const ad = await prisma.ad.findUnique({
        select: {
            discord: true
        },
        where: {
            id:adId
        }
    })
    res.json(ad);
});


app.listen(3000);
