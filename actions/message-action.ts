"use server";

import prismaClient from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";

const MessageSchema = z.object({
  message: z.string().min(3, { message: "Pesan minimal 3 karakter!" }),
  parentId: z.string().optional(),
  private: z.boolean()
});

export async function createMessage(formData: { message: string, private: boolean }) {
  const valiDated = MessageSchema.safeParse(formData);

  if (!valiDated.success) {
    throw new Error(valiDated.error.flatten().fieldErrors.message?.[0] || "Validasi gagal");
  }

  try {
    await prismaClient.message.create({
      data: { message: valiDated.data.message, isPrivate: valiDated.data.private, createdAt: new Date() }
    });

    revalidatePath('/');

    const successReponse = {
      success: true,
      message: "Thank you for taking the time to send a few words to the owner of this account!",
    }

    return successReponse;
  } catch (error) {
    throw new Error("Terjadi kesalahan pada server.");
  }
}

export async function createMessageReply(formData: { message: string; parentId: string, private: boolean }) {
  const valiDated = MessageSchema.safeParse(formData);

  if (!valiDated.success) {
    throw new Error(valiDated.error.flatten().fieldErrors.message?.[0] || "Validasi gagal");
  }

  try {
    await prismaClient.message.create({
      data: { message: valiDated.data.message, parentId: valiDated.data.parentId, createdAt: new Date() }
    });

    revalidatePath('/');

    const successReponse = {
      success: true,
      message: "Thank you for your response!",
    }

    return successReponse;
  } catch (error) {
    throw new Error("Terjadi kesalahan pada server.");
  }
}

export async function getMessage() {
  try {
    const messageData = await prismaClient.message.findMany({
      where: { parentId: null, isPrivate: false },
      include: {
        _count: {
          select: {
            replies: true,
          }
        },
        replies: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const responseSuccess = {
      success: true,
      message: "Message data retrieved successfully!",
      data: messageData
    }

    return responseSuccess;
  } catch (error) {
    throw new Error("Terjadi kesalahan pada server.");
  }
}

export async function getComments(messageId: string) {
  try {
    const messageData = await prismaClient.message.findMany({
      where: { id: messageId },
      include: {
        _count: {
          select: {
            replies: true,
          }
        },
        replies: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const responseSuccess = {
      success: true,
      message: "Message data retrieved successfully!",
      data: messageData
    }

    return responseSuccess;
  } catch (error) {
    throw new Error("Terjadi kesalahan pada server.");
  }
}