import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Label } from "./ui/label"
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group"
import { Input } from "./Input"

const timeRangeSchema = z.object({
  from: z.string().min(1, "Horário obrigatório"),
  to: z.string().min(1, "Horário obrigatório"),
})

const dayScheduleSchema = z.object({
  isOpen: z.boolean(),
  timeRange: z.preprocess(
    // This preprocessor conditionally validates timeRange based on isOpen
    (val, ctx) => {
      const obj = val as { isOpen: boolean; timeRange: { from: string; to: string } }
      if (obj.isOpen) {
        return obj.timeRange
      }
      return { from: "", to: "" } // If closed, don't validate times
    },
    timeRangeSchema.refine(
      (data) => {
        // This refinement is only applied when isOpen is true (due to preprocessor)
        return data.from !== "" && data.to !== ""
      },
      {
        message: "Horários obrigatórios quando aberto",
        path: ["from"],
      },
    ),
  ),
})

// Define the schema for the entire schedule
export const scheduleSchema = z.object({
  domingo: dayScheduleSchema,
  segunda: dayScheduleSchema,
  terca: dayScheduleSchema,
  quarta: dayScheduleSchema,
  quinta: dayScheduleSchema,
  sexta: dayScheduleSchema,
  sabado: dayScheduleSchema,
})

export type ScheduleData = z.infer<typeof scheduleSchema>

// Type for external errors that can be passed to the component
export type ScheduleErrors = {
  [K in keyof ScheduleData]?: {
    isOpen?: string
    timeRange?: {
      from?: string
      to?: string
    }
  }
}

interface AtendimentoFormProps {
  onChange?: (data: ScheduleData) => void
  value?: Partial<ScheduleData>
  errors?: ScheduleErrors
}

export function HoursForm({ onChange, value, errors }: AtendimentoFormProps) {
  // Initialize form with React Hook Form and Zod resolver
  const form = useForm<ScheduleData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      domingo: { isOpen: false, timeRange: { from: "", to: "" } },
      segunda: { isOpen: false, timeRange: { from: "", to: "" } },
      terca: { isOpen: false, timeRange: { from: "", to: "" } },
      quarta: { isOpen: false, timeRange: { from: "", to: "" } },
      quinta: { isOpen: false, timeRange: { from: "", to: "" } },
      sexta: { isOpen: false, timeRange: { from: "", to: "" } },
      sabado: { isOpen: false, timeRange: { from: "", to: "" } },
      ...value,
    },
    mode: "onChange",
  })

  // Update form when external value changes
  useEffect(() => {
    if (value) {
      Object.entries(value).forEach(([key, val]) => {
        if (val) {
          form.setValue(key as any, val as any, { shouldValidate: true })
        }
      })
    }
  }, [value, form])

  // Handle form changes
  useEffect(() => {
    const subscription = form.watch((formValues) => {
      if (onChange) {
        onChange(form.getValues())
      }
    })

    return () => subscription.unsubscribe()
  }, [form, onChange])

  const days: Array<{ key: keyof ScheduleData; label: string }> = [
    { key: "domingo", label: "Domingo" },
    { key: "segunda", label: "Segunda" },
    { key: "terca", label: "Terça" },
    { key: "quarta", label: "Quarta" },
    { key: "quinta", label: "Quinta" },
    { key: "sexta", label: "Sexta" },
    { key: "sabado", label: "Sábado" },
  ]

  return (
    <Card className="w-full border-red-100">
      <CardHeader className="text-red-700">
        <CardTitle>Atendimento</CardTitle>
      </CardHeader>
      <Separator className="bg-red-200" />
      <CardContent className="pt-6">
        <Form {...form}>
          <div className="space-y-4">
            {days.map((day) => (
              <div key={day.key} className="flex items-center gap-4">
                <div className="w-24">
                  <Label>{day.label}</Label>
                </div>

                <FormField
                  control={form.control}
                  name={`${day.key}.isOpen` as any}
                  render={({ field }) => (
                    <FormItem>
                      <ToggleGroup
                        type="single"
                        value={field.value ? "aberto" : "fechado"}
                        onValueChange={(value) => {
                          if (value) {
                            field.onChange(value === "aberto")
                          }
                        }}
                        className="border rounded-md border-red-100"
                      >
                        <ToggleGroupItem
                          value="aberto"
                          className="px-6 data-[state=on]:bg-red-100 data-[state=on]:text-red-700"
                        >
                          Aberto
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="fechado"
                          className="px-6 data-[state=on]:bg-red-100 data-[state=on]:text-red-700"
                        >
                          Fechado
                        </ToggleGroupItem>
                      </ToggleGroup>
                      {errors?.[day.key]?.isOpen && (
                        <p className="text-xs text-red-500 mt-1">{errors[day.key]?.isOpen}</p>
                      )}
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-2">
                  <Label>Das</Label>
                  <FormField
                    control={form.control}
                    name={`${day.key}.timeRange.from` as any}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormControl>
                          <Input
                            type="time"
                            className="w-32 border-red-100 focus-visible:ring-red-200"
                            {...field}
                            disabled={!form.getValues(`${day.key}.isOpen`)}
                            placeholder="-"
                          />
                        </FormControl>
                        {form.getValues(`${day.key}.isOpen`) &&
                          (errors?.[day.key]?.timeRange?.from ? (
                            <p className="absolute text-xs mt-1 text-red-500">{errors[day.key]?.timeRange?.from}</p>
                          ) : (
                            form.formState.errors[day.key]?.timeRange?.from && (
                              <FormMessage className="absolute text-xs mt-1 text-red-500">Obrigatório</FormMessage>
                            )
                          ))}
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Label>Até</Label>
                  <FormField
                    control={form.control}
                    name={`${day.key}.timeRange.to` as any}
                    render={({ field }) => (
                      <FormItem className="space-y-0">
                        <FormControl>
                          <Input
                            type="time"
                            className="w-32 border-red-100 focus-visible:ring-red-200"
                            {...field}
                            disabled={!form.getValues(`${day.key}.isOpen`)}
                            placeholder="-"
                          />
                        </FormControl>
                        {form.getValues(`${day.key}.isOpen`) &&
                          (errors?.[day.key]?.timeRange?.to ? (
                            <p className="absolute text-xs mt-1 text-red-500">{errors[day.key]?.timeRange?.to}</p>
                          ) : (
                            form.formState.errors[day.key]?.timeRange?.to && (
                              <FormMessage className="absolute text-xs mt-1 text-red-500">Obrigatório</FormMessage>
                            )
                          ))}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}

