"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"


const formSchema = z.object({
  name: z.string().min(3, "This field is require"),
  email: z.email(),
  password: z.string().min(8, "Min length 8"),
})

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {


  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("User Creating...")
      try {
        const { data, error } = await authClient.signUp.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        };

        toast.success("user Create sucessfull", { id: toastId })

      } catch (error) {
        toast.error("Internal server...", { id: toastId })

      }
    }
  })


  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="reg" onSubmit={(e) => {
          e.preventDefault()
          form._handleSubmit()
        }
        }>
          <form.Field name="name" children={(field) => {
            // all docs shadcn ui
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field>
                <FieldLabel>Name: </FieldLabel>
                <Input
                  type="text"
                  value={field.state.value}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}>
            {/* for error add roles config file: eslint.config.mjs */}

          </form.Field>
          <form.Field name="email" children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field>
                <FieldLabel>Email: </FieldLabel>
                <Input
                  type="email"
                  value={field.state.value}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}>
            {/* for error add roles config file: eslint.config.mjs */}

          </form.Field>
          <form.Field name="password" children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field>
                <FieldLabel>Name: </FieldLabel>
                <Input
                  type="password"
                  value={field.state.value}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && (
                  <FieldError errors={field.state.meta.errors} />
                )}
              </Field>
            )
          }}>
            {/* for error add roles config file: eslint.config.mjs */}

          </form.Field>

        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button form="reg" type="submit">Register</Button>
      </CardFooter>
    </Card>
  )
}
