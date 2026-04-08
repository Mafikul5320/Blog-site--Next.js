"use client"

import { BlogPost } from "@/actions/blog.action"
import { useEffect, useState } from "react"

export default function About() {
    const [data, setData] = useState(null)
    console.log(data)

    useEffect(() => {
        (async () => {
            const result = await BlogPost();
            setData(result)
        })()
    }, [])

    return (
        <div>About</div>
    )
}