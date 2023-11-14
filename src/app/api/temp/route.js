import { isStudentInDatabase, getStudentDetails } from '../../../sql-queries/user.js';
import { NextResponse } from 'next/server';
export async function POST(request) {
    try{
    // get data or put dta in SQL
        // const results = await isStudentInDatabase("PES2UG21CS593")
        const results = await getStudentDetails()
        return NextResponse.json({ status: 'Success' , result: results});
    } catch (error) {
        return NextResponse.json({ status: 'Failure' , result: error });
    }
}