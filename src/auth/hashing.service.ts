import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

export class HashingService {

    async hashPassword(password: string, saltRounds: number): Promise<string> {
        return bcrypt.hash(password, saltRounds);
    }

    async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}