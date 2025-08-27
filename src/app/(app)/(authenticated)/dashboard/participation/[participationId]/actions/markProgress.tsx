"use server";

import { Participation } from "@/payload-types";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getUser } from "@/app/(app)/(authenticated)/actions/getUser";

export async function markProgress(participation: Participation) {
  const payload = await getPayload({ config: configPromise });
  const user = await getUser();

  if (!participation || typeof participation.progress !== "number") {
    console.error("Invalid participation data");
    return null;
  }

  const nextProgressValue = participation.progress + 1;

  try {
    const updateRes = await payload.update({
      collection: "participation", // cek nama collection
      id: participation.id,
      data: {
        progress: nextProgressValue,
      },
      overrideAccess: false,
      user: user,
    });

    return updateRes;
  } catch (err) {
    console.error("Error updating participation progress", err);
    return null;
  }
}
