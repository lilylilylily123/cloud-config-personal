import {FormEvent, useState} from "react";
import PocketBase from "pocketbase";
import {useRouter} from "next/router";
export const pb = new PocketBase("https://panthium.pockethost.io")


export default function Home() {
    const router = useRouter();
    const authWithDiscord = async () => {
        const authData = await pb.collection("users")
            .authWithOAuth2({provider: "discord", scopes: ["identify", "guilds"]})
            .catch((err) => console.log(err))
        console.log(authData)
        await router.push("/config")
    }
    return (
        <div>
            <button onClick={authWithDiscord}>Auth with Discord</button>
        </div>
    )
}