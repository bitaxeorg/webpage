import { HardHat } from 'lucide-react'

export default function UnderDevelopment() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-2xl text-center">
        <HardHat className="w-24 h-24 mx-auto mb-8 text-yellow-400 animate-bounce" />
        <h1 className="text-4xl font-bold mb-4">Open Source Miners United</h1>
        <p className="text-xl mb-8">🚧 Our website is currently under development 🚧</p>
        <p className="mb-8">
          We're working hard to bring you an open-source platform that unites miners worldwide. 
          Stay tuned for updates on our progress and upcoming features!
        </p>
      </div>
      <footer className="mt-16 text-sm text-gray-400">
        © {new Date().getFullYear()} Open Source Miners United. All rights reserved.
      </footer>
    </div>
  )
}

