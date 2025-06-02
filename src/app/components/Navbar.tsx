'use client'
import { AppBar, Button, Toolbar } from '@mui/material'
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter()

  return (
    <AppBar color="inherit">
      <Toolbar>
        <div className="flex justify-center w-full">
          <div className="max-w-[1200px] w-full">
            <Button
              color="inherit"
              variant="text"
              className="text-base font-medium normal-case no-underline"
              onClick={() => router.push("/")}
            >
              Home
            </Button>
            <Button
              color="inherit"
              variant="text"
              className="text-base font-medium normal-case no-underline"
              onClick={() => router.push("/products")}
            >
              Produtos
            </Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}