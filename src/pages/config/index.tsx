import styles from '../../styles/index.module.css'
import {useRouter} from "next/router";
import {FormEvent, useEffect, useState} from "react";
import {pb} from "@/pages";
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


function Index() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("pocketbase_auth")) {
      router.push("/")
    }
  }, [router])
  const [config, setConfig] = useState<configType>(defaultConfig)
  const updateForm = (e: FormEvent) => {
    console.log(e)
    e.preventDefault();
    console.log("update form")
    const answerArray = []
    const obj = {...defaultConfig}
    const values = Object.values(obj)
    const keys = Object.keys(obj)
    const newObj = {}
    for (let i = 0; i <= 12; i++) {
      // @ts-ignore
      const element = (e.target as HTMLFormElement).elements[i];
      // @ts-ignore
      answerArray.push(element.value)
      // @ts-ignore
      console.log(element.value)
      // @ts-ignore
      // Object.keys(obj)[i] = element.value
      let obj = {};
      for (let i = 0; i < keys.length; i++) {
        // @ts-ignore
        newObj[keys[i]] = answerArray[i];
      }
    }
    console.log(newObj)
    //@ts-ignore
    setConfig(newObj)
    // @ts-ignore
    if (pb.authStore.model.discord === false) {
      console.log("no discord")
      alert("You need to be logged in with discord in order to use this.")
      return
    }
    pb.collection("users").update(pb?.authStore?.model?.id as string, {config: newObj})
        .then((res) => {
          // console.log(res)
        })
  }


  //link to google.com in function
  function home() {
    window.location.href = "https://panthium.xyz";
  }

  function documentation() {
    window.location.href = "https://panthiums-organization.gitbook.io";
  }


  return (
    <div className={styles.App}>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      {/* @ts-ignore */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={"true"}></link>
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>

      <div className={styles.sideBar}>
        <div className={styles.sideBarEl} onClick={home} style={{ marginTop: "1vw" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-door-fill" viewBox="0 0 16 16">
            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
          </svg>
          <div style={{ marginLeft: "10px" }}>
          Home
          </div>
        </div>
        <div className={styles.sideBarEl} onClick={documentation}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-file-earmark-fill" viewBox="0 0 16 16">
            <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z"/>
          </svg>
          <div style={{ marginLeft: "10px" }}>
          Docs
          </div>
        </div>
        <div className={styles.sideBarEl} style={{ backgroundColor: "#504839" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
            <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
          </svg>
          <div style={{ marginLeft: "10px" }}>
            Config
          </div>
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.topPage}>
          <div className={styles.topPageLeft}>
            <div className={styles.topPageLeftTop}>
              <svg style={{ marginRight: "1vw" }} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16">
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
              </svg>
              Config
            </div>
            <div className={styles.topPageLeftBottom}>
              <span>Official cloud configuration for the <span style={{ color: "#fec77b" }}>Panthium Overwatch Cheat</span></span>
            </div>
          </div>
          <div className={styles.topPageRight}>
            <div className={styles.logOutBtn} onClick={
              () => {
                localStorage.removeItem("pocketbase_auth")
                router.reload()
              }
            }>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
              </svg>
              Log Out
            </div>
          </div>
        </div>
        <div className={styles.bottomPage}>
          {/*<form className={styles.form} >*/}
          <form className={styles.bottomPageTop} onSubmit={(e: FormEvent) => updateForm(e)}>
            {Object.keys(config).map((key, index) => {
              return (
                  <div key={index} className={styles.inputFields} >
                    <div className={styles.inputFieldTitle}>
                      {key.replaceAll("_", " ")}
                    </div>
                    {/* @ts-ignore */}
                    <input className={styles.inputFieldOfficial} defaultValue={defaultConfig[key]} type="text" placeholder="Type Here..." />
                  </div>
              )
            })}

            <div className={styles.fakeInputFields}></div>
            <div className={styles.fakeInputFields}></div>
            <div className={styles.fakeInputFields}></div>




          <div className={styles.bottomPageBottom}>
            <div className={styles.bottomPageBottomLeft}>
              <button type="submit" id="submitForm" className={styles.submitButton}>
                Submit
              </button>
            </div>
            <div className={styles.bottomPageBottomRight}>
              <button type="button" id="submitRandValues" className={styles.randomizeButton}>
                Randomize
              </button>
              <button type="button" id="submitClearValues" className={styles.clearButton}>
                Clear
              </button>
            </div>
          </div>
          </form>
          {/*</form>*/}
        </div>
      </div>


    </div>
  );
}

export default Index;
