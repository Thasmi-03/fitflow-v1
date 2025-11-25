import { GalleryVerticalEnd } from "lucide-react"
import { RegisterForm } from "@/components/auth/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
          <a href="/" className="flex items-center gap-2 font-medium">
            
            FitFlow
          </a>
       
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      
      
    </div>
  )
}
