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
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {


  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
    onSubmit: async ({ value }) => {
      console.log(value)
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
            return (
              <Field>
                <FieldLabel>Name: </FieldLabel>
                <Input
                  type="text"
                  value={field.state.value}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )
          }}>
            {/* for error add roles config file: eslint.config.mjs */}

          </form.Field>
          <form.Field name="email" children={(field) => {
            return (
              <Field>
                <FieldLabel>Email: </FieldLabel>
                <Input
                  type="email"
                  value={field.state.value}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )
          }}>
            {/* for error add roles config file: eslint.config.mjs */}

          </form.Field>
          <form.Field name="password" children={(field) => {
            return (
              <Field>
                <FieldLabel>Name: </FieldLabel>
                <Input
                  type="password"
                  value={field.state.value}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )
          }}>
            {/* for error add roles config file: eslint.config.mjs */}

          </form.Field>

        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button form="reg" type="submit">Submit</Button>
      </CardFooter>
    </Card>
  )
}
