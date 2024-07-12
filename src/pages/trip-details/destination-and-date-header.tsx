import { MapPin, Calendar, Settings2, ArrowRight, X } from 'lucide-react'
import { Button } from '../../components/button'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { format } from 'date-fns'
import { Input } from '../../components/input'
import { DateRange, DayPicker } from 'react-day-picker'

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()
  const [isChangeLocationAndDateOpen, setIsChangeLocationAndDateOpen] =
    useState(true)
  const [destination, setDestination] = useState('')
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >()

  function openChangeLocationAndDate() {
    setIsChangeLocationAndDateOpen(false)
  }

  async function closeChangeLocationAndDate() {
    setIsChangeLocationAndDateOpen(true)

    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventStartAndEndDates?.from,
      ends_at: eventStartAndEndDates?.to,
    })

    location.reload()
  }

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip))
  }, [tripId])

  const displayedDate = trip
    ? format(trip.starts_at, "d' de 'LLL")
        .concat(' até ')
        .concat(format(trip.ends_at, "d' de 'LLL"))
    : null

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      {isChangeLocationAndDateOpen ? (
        <div className="flex items-center gap-2">
          <MapPin className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{trip?.destination}</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 flex-1">
          <MapPin className="size-5 text-zinc-400" />
          <Input
            type="text"
            placeholder="Para onde você vai?"
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>
      )}

      <div className="flex items-center gap-5">
        {isChangeLocationAndDateOpen ? (
          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-zinc-100">{displayedDate}</span>
          </div>
        ) : (
          <button
            onClick={openDatePicker}
            className="flex items-center gap-2 text-left w-[250px]"
          >
            <Calendar className="size-5 text-zinc-400" />
            <span className="text-lg text-zinc-400 w-40 flex-1">
              {displayedDate || 'Quando?'}
            </span>
          </button>
        )}

        {isDatePickerOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Selecione a data</h2>
                  <button type="button" onClick={closeDatePicker}>
                    <X className="size-5 text-zinc-400" />
                  </button>
                </div>
              </div>

              <DayPicker
                mode="range"
                selected={eventStartAndEndDates}
                onSelect={setEventStartAndEndDates}
              />
            </div>
          </div>
        )}

        <div className="w-px h-6 bg-zinc-800" />

        {isChangeLocationAndDateOpen ? (
          <Button onClick={openChangeLocationAndDate} variant="secondary">
            Alterar local/data
            <Settings2 className="size-5" />
          </Button>
        ) : (
          <Button onClick={closeChangeLocationAndDate}>
            Confirmar
            <ArrowRight className="size-5" />
          </Button>
        )}
      </div>
    </div>
  )
}
