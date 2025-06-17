"use client"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { useDispatch } from 'react-redux'
import { setUserData } from '@/components/state/persist/userSlice'
import {Form,FormField,FormItem,FormLabel,FormControl,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"


type RegisterFormValues = {
  email: string
  password: string
  firstname: string
  lastname: string
  role: string
  secretToken?: string
}

export default function Register() {
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      role: "",
      secretToken: "",
    },
  })

  const dispatch = useDispatch()
  const role=form.watch("role")
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await axios.post('https://strim-server.onrender.com/api/auth/register', data)
      if (response.status === 200) {
        const { accesstoken } = response.data

        dispatch(setUserData({
          email: data.email,
          firstname: data.firstname,
          accesstoken,
          role: data.role,
        }))

        window.location.href = '/home'
      }
    } catch (error) {
      console.error("Registration failed:", error)
      alert("Something went wrong. Please try again.")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 py-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">SIGN UP</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Firstname */}
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Lastname */}
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
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

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Secret Token – only for Admins */}
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

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        {/* OAuth Buttons */}
        <Button type="button" variant="outline" className="w-full flex items-center gap-4 mt-8"
          onClick={() => window.open("http://localhost:2400/api/auth/google", "_self")}
        >
          <FcGoogle className="text-xl" />
          Sign Up with Google
        </Button>

        <Button type="button" variant="outline" className="w-full flex items-center gap-4 mt-4"
          onClick={() => window.open("http://localhost:2400/api/auth/github", "_self")}
        >
          <FaGithub className="text-xl" />
          Sign Up with GitHub
        </Button>
      </Form>
    </div>
  )
}
