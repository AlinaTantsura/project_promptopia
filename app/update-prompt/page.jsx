import UpdatePrompt from "@components/UpdatePrompt"
import { Suspense } from "react"

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePrompt />
   </Suspense>
  )
}

export default Page
