"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { BlogCreate } from "@/actions/blog.action";
import { useState } from "react";
import { toast } from "sonner";

const BloSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  thumbnail: z.string().url("Must be a valid URL"),
  tag: z.string(),
});

export default function BlogForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      tag: "",
    },

    onSubmit: async ({ value }) => {
      const tostId = toast.loading("Creating...")
      const finalData = {
        ...value,
        tag: value.tag
          ? value.tag.split(",").map((t) => t.trim()).filter((t) => t !== "")
          : [],
      };
      try {
        const BlogPost = await BlogCreate(finalData);
        console.log(BlogPost, "Create??");
        toast.success("Post Create sucessfull...", { id: tostId })
      } catch (error) {
        setErrorMessage("Failed to create blog post. Please try again.");
        console.error(error);
      }
      setErrorMessage(""); // Clear error message on success

    },

    validators: {
      onSubmit: BloSchema,
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create Blog Post
          </CardTitle>
        </CardHeader>

        <CardContent>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            {/* Title */}
            <form.Field name="title">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel>Title</FieldLabel>
                    <Input
                      placeholder="Enter blog title"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Description */}
            <form.Field name="content">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel>Description</FieldLabel>
                    <Textarea
                      placeholder="Write your blog content..."
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Thumbnail */}
            <form.Field name="thumbnail">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel>Thumbnail URL</FieldLabel>
                    <Input
                      placeholder="Enter thumbnail URL"
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Tag */}
            <form.Field name="tag">
              {(field) => (
                <Field>
                  <FieldLabel>Tag</FieldLabel>
                  <Input
                    placeholder="tag1, tag2"
                    value={field.state.value}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                  />
                </Field>
              )}
            </form.Field>

            <Button type="submit" className="w-full">
              Post Blog
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}