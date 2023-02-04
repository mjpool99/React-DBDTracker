import React, { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, addDoc, onSnapshot, updateDoc, doc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const DBContext = createContext();

export function useDB() {
    return useContext(DBContext)
}

export function DBProvider({ children }) {
    const [killers, setKillers] = useState([]);
    const [maps, setMaps] = useState([]);
    const [survivors, setSurvivors] = useState([]);
    const [killerResults, setKillerResults] = useState([]);
    const [survivorResults, setSurvivorResults] = useState([]);
    const { currentUser } = useAuth();

    //DB Setter Functions
    async function setSurvivorMatchResult(dbUser, map, killer, survivor, matchResult) {
        let docID;
        await addDoc(collection(db, "survivorMatches"), {
            id: null,
            user: dbUser,
            map: map,
            killer: killer,
            survivor: survivor,
            matchResult: matchResult,
            createdAt: new Date().getTime()
        }).then(async (doc) => {
            docID = doc.id;
        })
        return await updateDoc(doc(db, "survivorMatches", docID), {
            id: docID
        })
    }
    async function setKillerMatchResult(dbUser, map, killer, matchResult, numberOfKills) {
        let docID;
        await addDoc(collection(db, "killerMatches"), {
            user: dbUser,
            map: map,
            killer: killer,
            matchResult: matchResult,
            numberOfKills: numberOfKills,
            createdAt: new Date().getTime()
        }).then((doc) => {
            docID = doc.id;
        })
        return await updateDoc(doc(db, "killerMatches", docID), {
            id: docID
        })
    }
    //DB Loader Functions
    async function getKillerList() {
        return await getDocs(collection(db, "killerID"));
    }
    async function getMapList() {
        return await getDocs(collection(db, "mapID"));
    }
    async function getSurvivorList() {
        return await getDocs(collection(db, "survivorID"));
    }
    async function getSurvivorMatchResult() {
        return await getDocs(query(collection(db, "survivorMatches"), where("user", "==", currentUser.uid), orderBy("createdAt", "desc")));
    }
    async function getKillerMatchResult() {
        return await getDocs(query(collection(db, "killerMatches"), where("user", "==", currentUser.uid), orderBy("createdAt", "desc")));
    }

    useEffect(() => {
        getKillerList().then((snapshot) => {
            snapshot.forEach(item => {
                let data = item.data();
                setKillers(killers => [...killers, data.name])
            })
            return killers
        })
        getMapList().then((snapshot) => {
            snapshot.forEach(item => {
                let data = item.data();
                setMaps(maps => [...maps, data.name])
            })
            return maps
        })
        getSurvivorList().then((snapshot) => {
            snapshot.forEach(item => {
                let data = item.data();
                setSurvivors(survivors => [...survivors, data.name])
            })
            return survivors
        })

        onSnapshot(collection(db, "survivorMatches"), (snapshot) => {
            getSurvivorMatchResult().then((snapshot) => {
                setSurvivorResults([]);
                snapshot.forEach(item => {
                    let data = item.data();
                    setSurvivorResults(survivorResults => [...survivorResults, data])
                })
                return survivorResults
            })
        })
    onSnapshot(collection(db, "killerMatches"), (snapshot) => {
        getKillerMatchResult().then((snapshot) => {
            setKillerResults([]);
            snapshot.forEach(item => {
                let data = item.data();
                setKillerResults(killerResults => [...killerResults, data])
            })
            return killerResults
        })
    })
}, [])

const value = {
    killers,
    maps,
    survivors,
    survivorResults,
    killerResults,
    setKillerMatchResult,
    setSurvivorMatchResult
}

return (
    <>
        <DBContext.Provider value={value}>
            {children}
        </DBContext.Provider>
    </>
)
}