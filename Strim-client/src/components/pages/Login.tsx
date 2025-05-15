"use client"
import { useEffect } from 'react'
import * as React from "react"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectValue,
  SelectTrigger,
} from '../ui/select'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"

type LoginFormValues = {
  email: string
  password: string
  role: string
  secretToken?: string
}

export default function Login() {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
      role: "",
      secretToken: "",
    },
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("accesstoken") && localStorage.getItem("email")) {
      navigate("/home")
    }
  }, [navigate])

  const role = form.watch("role") // 👈 Watch the selected role value

  const goToSignup = () => {
    window.location.href = "/register"
  }

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Login Data:", data)

    const response = await axios.post("http://localhost:2400/api/auth/login", data)

    console.log("Response:", response.data)
    localStorage.setItem("email", data.email)

    if (response.status === 200) {
      localStorage.setItem("accesstoken", response.data.accesstoken)
      window.location.href = "/home"
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 py-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">LOGIN</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role and Submit Button Side-by-Side */}
<div className="flex items-center gap-4">
  <FormField
    control={form.control}
    name="role"
    render={({ field }) => (
      <FormItem className="w-[350px]">
        <FormLabel>Role</FormLabel>
        <Select onValueChange={field.onChange} value={field.value}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Customer">User</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />

  <Button type="submit" className="w-2/3 mt-6">
    Login
  </Button>
</div>

{/* Secret Token Field (only if role is Admin) */}
{role === "Admin" && (
  <FormField
    control={form.control}
    name="secretToken"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Secret Token</FormLabel>
        <FormControl>
          <Input placeholder="Enter Secret Token" {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
)}

        </form>

        {/* Social Buttons */}
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-4 mt-8"
          onClick={() => window.open("http://localhost:2400/api/auth/google", "_self")}
        >
          <FcGoogle className="text-xl" />
          Login with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-4 mt-4"
          onClick={() => window.open("http://localhost:2400/api/auth/github", "_self")}
        >
          <FaGithub className="text-xl" />
          Login with GitHub
        </Button>

        <p className="mt-4">New to RIPPL? Sign Up</p>
        <Button onClick={goToSignup} className="w-full mt-6">Register</Button>
      </Form>
    </div>
  )
}
