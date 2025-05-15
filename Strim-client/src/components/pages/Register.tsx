"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

type RegisterFormValues = {
  email: string
  password: string
  firstname:string
  lastname:string
  role:string
  secretToken?: string
}

export default function Register() {
  const form = useForm<RegisterFormValues>({
    defaultValues: {
      email: "",
      password: "",
      firstname:"",
      lastname:"",
      role: "",
      secretToken:""
    },
  })
   
  const onSubmit = async(data: RegisterFormValues) => {
    console.log("Login Data:", data)
    // Add your login logic here
    const response=await axios.post('http://localhost:2400/api/auth/register',data);
    console.log("Response:", response.data);
      localStorage.setItem("email",data.email);
    if(response.status===200){
      localStorage.setItem("accesstoken",response.data.accesstoken);
      window.location.href = "/home";
    }
  }
 const role = form.watch("role") 
  return (
    <div>
    <div className="max-w-md mx-auto mt-20 py-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">SIGN UP</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Firstname</FormLabel>
                <FormControl>
                  <Input type="firstname" placeholder="you@example.com" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lastname</FormLabel>
                <FormControl>
                  <Input type="lastname" placeholder="you@example.com" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
            )}
          />
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

          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-1/2">
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
        <Button
  type="button"
  variant="outline"
  className="w-full flex items-center gap-4 mt-8"
  onClick={() => window.open("http://localhost:2400/api/auth/google", "_self")}
>
  <FcGoogle className="text-xl" />
  SignUp with Google
</Button>

<Button
  type="button"
  variant="outline"
  className="w-full flex items-center gap-4 mt-4"
  onClick={() => window.open("http://localhost:2400/api/auth/github", "_self")}
>
  <FaGithub className="text-xl" />
  SignUp with GitHub
</Button>


      </Form>
    </div>
    </div>
  )
}
