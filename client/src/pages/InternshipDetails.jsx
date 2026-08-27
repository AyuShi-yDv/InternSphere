import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  MapPin,
  Clock3,
  IndianRupee,
  CalendarDays,
  CheckCircle2,
  Loader2
} from 'lucide-react'

import Navbar from '../components/Navbar'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function InternshipDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [job, setJob] = useState(null)
  const [applied, setApplied] = useState(false)
  const [applying, setApplying] = useState(false)
  const [loadingApplication, setLoadingApplication] = useState(false)
  const [message, setMessage] = useState('')

  const { user } = useAuth()

  // Fetch internship
  useEffect(() => {
    api
      .get('/internships/' + id)
      .then((r) => setJob(r.data.data))
      .catch(() => {})
  }, [id])

  // Check whether current student already applied
  useEffect(() => {
    if (!user || user.role !== 'student') return

    setLoadingApplication(true)

    api
      .get('/applications/mine')
      .then((r) => {
        const applications = r.data.data || []

        const alreadyApplied = applications.some(
          (application) =>
            application.internship?._id === id ||
            application.internship === id
        )

        setApplied(alreadyApplied)
      })
      .catch(() => {})
      .finally(() => setLoadingApplication(false))
  }, [id, user])

  const apply = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    if (user.role !== 'student') {
      setMessage('Only students can apply for internships.')
      return
    }

    if (applied) return

    setApplying(true)
    setMessage('')

    try {
      await api.post('/applications', {
        internshipId: id
      })

      setApplied(true)
      setMessage('Application submitted successfully!')
    } catch (e) {
      const errorMessage =
        e.response?.data?.message || 'Unable to apply'

      setMessage(errorMessage)

      // If backend says already applied,
      // update the button immediately.
      if (errorMessage.toLowerCase().includes('already applied')) {
        setApplied(true)
      }
    } finally {
      setApplying(false)
    }
  }

  if (!job) {
    return (
      <>
        <Navbar />

        <div className="p-20 text-center">
          Loading internship…
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-10">

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* MAIN CONTENT */}

          <section className="rounded-3xl bg-white p-8 ring-1 ring-slate-200">

            <div className="flex gap-5">

              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-2xl font-black text-brand">
                {job.companyName?.[0]}
              </div>

              <div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                  {job.source || 'InternSphere'}
                </span>

                <h1 className="mt-3 text-3xl font-black">
                  {job.title}
                </h1>

                <p className="mt-1 font-semibold text-slate-500">
                  {job.companyName}
                </p>

              </div>

            </div>


            {/* INTERNSHIP INFO */}

            <div className="mt-8 grid gap-3 border-y py-6 sm:grid-cols-2">

              <span className="flex gap-2 text-sm">
                <MapPin />
                {job.location}
              </span>

              <span className="flex gap-2 text-sm">
                <Clock3 />
                {job.duration}
              </span>

              <span className="flex gap-2 text-sm">
                <IndianRupee />
                {job.stipend}
              </span>

              <span className="flex gap-2 text-sm">
                <CalendarDays />

                Apply by{' '}

                {job.applicationDeadline
                  ? new Date(
                      job.applicationDeadline
                    ).toLocaleDateString()
                  : 'Not specified'}
              </span>

            </div>


            {/* DESCRIPTION */}

            <h2 className="mt-8 text-xl font-black">
              About the internship
            </h2>

            <p className="mt-3 whitespace-pre-line leading-8 text-slate-600">
              {job.description}
            </p>


            {/* ELIGIBILITY */}

            <h2 className="mt-8 text-xl font-black">
              Eligibility
            </h2>

            <p className="mt-3 whitespace-pre-line leading-8 text-slate-600">
              {job.eligibility || 'See application details.'}
            </p>


            {/* SKILLS */}

            <div className="mt-6 flex flex-wrap gap-2">

              {job.skills?.map((skill) => (

                <span
                  className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-brand"
                  key={skill}
                >
                  {skill}
                </span>

              ))}

            </div>

          </section>


          {/* APPLICATION SIDEBAR */}

          <aside className="h-fit rounded-3xl bg-navy p-7 text-white lg:sticky lg:top-24">

            <p className="text-sm text-white/60">
              Ready to apply?
            </p>

            <h2 className="mt-2 text-2xl font-black">
              Take the next step.
            </h2>


            {/* APPLICATION BUTTON */}

            <button
              onClick={apply}
              disabled={
                applying ||
                applied ||
                loadingApplication
              }
              className={`mt-7 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-black transition ${
                applied
                  ? 'cursor-not-allowed bg-emerald-500'
                  : 'bg-brand hover:scale-[1.02] hover:shadow-lg'
              } ${
                applying || loadingApplication
                  ? 'opacity-70'
                  : ''
              }`}
            >

              {loadingApplication ? (

                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Checking application…
                </>

              ) : applying ? (

                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  Applying…
                </>

              ) : applied ? (

                <>
                  <CheckCircle2 size={18} />

                  Applied
                </>

              ) : (

                'Apply now'

              )}

            </button>


            {/* SUCCESS / ERROR MESSAGE */}

            {message && (

              <div
                className={`mt-4 rounded-xl p-3 text-sm font-semibold ${
                  message
                    .toLowerCase()
                    .includes('success')
                    ? 'bg-emerald-500/20 text-emerald-200'
                    : 'bg-red-500/20 text-red-200'
                }`}
              >
                {message}
              </div>

            )}


            {/* EXTERNAL LISTING */}

            {job.externalUrl && (

              <a
                target="_blank"
                rel="noreferrer"
                href={job.externalUrl}
                className="mt-3 block rounded-xl border border-white/20 py-3.5 text-center font-bold transition hover:bg-white/10"
              >
                Open source listing
              </a>

            )}


            {/* FEATURES */}

            <div className="mt-7 space-y-3 text-sm text-white/70">

              <div className="flex gap-2">
                <CheckCircle2 size={17} />
                Real listing metadata
              </div>

              <div className="flex gap-2">
                <CheckCircle2 size={17} />
                Application tracking
              </div>

              <div className="flex gap-2">
                <CheckCircle2 size={17} />
                Secure student application
              </div>

            </div>

          </aside>

        </div>

      </main>
    </>
  )
}