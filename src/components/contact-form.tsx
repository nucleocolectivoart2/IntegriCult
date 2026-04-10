
"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Requerido"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "Mensaje muy corto"),
});

export function ContactForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Mensaje enviado",
      description: "Pronto estaré en contacto contigo.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full max-w-md ml-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nombre" {...field} className="bg-white/80 border-primary/20 rounded-none h-11 focus:border-accent transition-colors text-sm" />
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
                <FormControl>
                  <Input placeholder="Email" {...field} className="bg-white/80 border-primary/20 rounded-none h-11 focus:border-accent transition-colors text-sm" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Mensaje..." {...field} className="bg-white/80 border-primary/20 rounded-none min-h-[90px] focus:border-accent transition-colors text-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-1">
          <Button type="submit" className="bg-accent hover:bg-accent/90 text-white rounded-none h-11 px-8 transition-transform active:scale-[0.98] font-bold uppercase tracking-widest text-[9px]">
            <Send className="w-3.5 h-3.5 mr-2" />
            Enviar Mensaje
          </Button>
        </div>
      </form>
    </Form>
  );
}
