"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import * as z from "zod"
import { useForm } from "@tanstack/react-form"


const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min length 8"),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { data: session } = authClient.useSession()
  console.log(session)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in...")

      try {
        const { error } = await authClient.signIn.email(value)

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }

        toast.success("Login successful 🎉", { id: toastId })

      } catch (error) {
        toast.error("Internal server error", { id: toastId })
      }
    },
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="log"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit() 
            }}
            className="space-y-4"
          >

            {/* Email */}
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid

                return (
                  <Field>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      type="email"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            {/* Password */}
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid

                return (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      type="password"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

          </form>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button form="log" type="submit">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}