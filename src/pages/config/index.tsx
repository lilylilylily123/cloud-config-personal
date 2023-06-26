import {FormEvent, useEffect, useState} from "react";
import styles from "@/styles/config.module.scss";
import {pb} from "@/pages";
import {useRouter} from "next/router";
interface configType {
    "FOV": number,
    "Smoothing": number,
    "Aimbot_Key": string,
    "Aimbone": string,
    "Threshhold": number,
    "Bhop": number,
    "Alt_Aimbot": number,
    "Triggerbot": number,
    "Triggerbot_Key": string,
    "Alt_Aimbot_Key": string,
    "Triggerbot_Type": string,
    "Accelerate": number,
    "Sensitivity": number
}

const defaultConfig: configType = {"FOV": 165.0, "Smoothing": 50.5, "Aimbot_Key": "Left Mouse", "Aimbone": "Head", "Threshhold": 0, "Bhop": 0, "Alt_Aimbot": 0, "Triggerbot": 0, "Triggerbot_Key": "Left Mouse", "Alt_Aimbot_Key": "Head", "Triggerbot_Type": "Normal", "Accelerate": 0, "Sensitivity": 25.5}

export default function Config() {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem("pocketbase_auth")) {
            router.push("/")
        }
    }, [router])
    const [config, setConfig] = useState<configType>(defaultConfig)
    const updateForm = (e: FormEvent) => {
        e.preventDefault();
        console.log("update form")
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        // console.log(data)
        //@ts-ignore
        setConfig(data)
        // @ts-ignore
        if (pb.authStore.model.discord === false) {
            console.log("no discord")
            alert("You need to be logged in with discord in order to use this.")
            return
        }
        pb.collection("users").update(pb?.authStore?.model?.id as string, {config: data})
            .then((res) => {
                console.log(res)
            })
    }
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={(e: FormEvent) => updateForm(e)}>
                {Object.keys(config).map((key, index) => {
                    return (
                        <div key={index}>
                            <label className={styles.label} htmlFor={key}>{key}</label>
                            {/* @ts-ignore */}
                            <input type={"text"} id={key} name={key} defaultValue={defaultConfig[key]}/>
                        </div>
                    )
                })}
                <input type={"submit"} value={"Submit"}/>
            </form>
        </div>
    )
}