import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
    console.log(session)
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">My App</div>
      <div className="relative">
        {session ? (
          <div className="flex items-center space-x-4">
            <div
              className="cursor-pointer relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            > 
            <div className="flex gap-2 items-center">
                <div className="text-white font-semibold">{session.user.name}</div>
              <Image
                src={session.user.avatar ? `https://photobox.cardboard.ink/user/avatar/${session.user.id}` : "https://cdn3.emoji.gg/emojis/9757-porfile.png"}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border border-gray-700"
              />
            </div>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border">
                  <button
                    onClick={() => signOut()}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
}
