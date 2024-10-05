import Image from "next/image"

function Header() {
  return (
    <header className=" flex items-center gap-4 text-md text-purple-800 mt-6">
      <Image
        src="/key-no-bg.png"
        alt="logo"
        className="rounded-md"
        width={40}
        height={40}
      />
      <h1 className="p-2 text-md font-bold">Missing Keys Visualizer</h1>
    </header>
  )
}

export { Header }
