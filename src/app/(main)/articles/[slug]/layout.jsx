"use server"
import axios from "axios"
import styles from "./page.module.css"
import FadeImage from "@/components/common/FadeImage/FadeImage"


export async function generateMetadata(
    { params, searchParams }) {
    // read route params
    const slug = params.slug
   
    // fetch data
    const product = await axios.get(`/api/articles/${slug}`).then((res) => res.data)
   
    return {
      title: product.title,
      openGraph: {
        description: product.description,
        title: product.title,
        images: [product.img],
      }
    }
  }

export default async function Layout ({
    children,
}) {
    return (
        <>
                    {children}
        </>
    )
}