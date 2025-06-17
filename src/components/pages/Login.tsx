"use client"
import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { FcGoogle } from "react-icons/fc"

import { useNavigate } from "react-router-dom"
import {Select,SelectContent,SelectItem,SelectValue,SelectTrigger,} from '../ui/select'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setUserData } from "../state/persist/userSlice"
import { useSelector } from "react-redux"
import type { RootState } from "../state/persist/store"

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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email=useSelector((state:RootState)=>state.user.email);
  const accesstoken=useSelector((state:RootState)=>state.user.accesstoken);
  const firstname=useSelector((State:RootState)=>State.user.firstname);
  const role=useSelector((state:RootState)=>state.user.role);
  useEffect(() => {
    
    if (email && accesstoken && firstname && role) {
      navigate("/home")
    }
  }, [email, accesstoken, firstname, role,navigate])


   
  const goToSignup = () => {
    navigate("/register")
  }

 const onSubmit = async (data: LoginFormValues) => {
  try {
    const response = await axios.post("https://strim-server.onrender.com/api/auth/login", data);

    if (response.status === 200 && data.role===response.data.role) {
      const { accesstoken, firstname} = response.data;

      // ✅ Save to Redux
      dispatch(setUserData({
        email: data.email,
        firstname: firstname,
        accesstoken: accesstoken,
        role: data.role,
      }
      
      ));
      window.location.href = "/home";
      window.location.href = "/home";
    }
    else{
        alert("Invalid role. Please select the correct role.");
      }
  } catch (error) {
    console.error("Login failed", error);
  }
};

  return (
    <div className="max-w-md mx-auto mt-20 py-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">LOGIN</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          {/* Role and Submit */}
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
                      <SelectItem value="User">User</SelectItem>
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

          {/* Secret Token if Admin */}
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
          type="button" variant="outline" className="w-full flex items-center gap-4 mt-8"
          onClick={() => window.open("http://localhost:2400/api/auth/google/callback", "_self")}
        >
          <FcGoogle className="text-xl" />
          Login with Google
        </Button>
        <p className="mt-4">New to STRIM? Sign Up</p>
        <Button onClick={goToSignup} className="w-full mt-6">
          Register
        </Button>
      </Form>
    </div>
  )
}
