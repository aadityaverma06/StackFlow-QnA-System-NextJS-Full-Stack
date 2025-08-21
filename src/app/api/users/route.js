import { answerCollection, db } from "@/models/collectionNames";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
export async function GET(request) {
    try {
    const fetchUsers = await users.list();
    return NextResponse.json({status: "success", users: fetchUsers.users});
    } catch (error) {
       return NextResponse.json({status: "failed", error}); 
    }
    
}