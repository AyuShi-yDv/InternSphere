import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BriefcaseBusiness,
  PlusCircle,
  FileText,
  Clock3,
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react'

import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function Dashboard() {
  const { user } = useAuth()

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)

  const canPost = ['admin', 'recruiter'].includes(user?.role)

  useEffect(() => {
    if (user?.role !== 'student') return

    setLoading(true)

    api
      .get('/applications/mine')
      .then((res) => {
        setApplications(res.data.data || [])
      })
      .catch(() => {
        setApplications([])
      })
      .finally(() => {
        setLoading(false)
      })
  }, [user])

  const statusIcon = (status) => {
    if (status === 'accepted') {
      return <CheckCircle2 size={17} />
    }

    if (status === 'rejected') {
      return <XCircle size={17} />
    }

    return <Clock3 size={17} />
  }

  const statusClass = (status) => {
    if (status === 'accepted') {
      return 'bg-emerald-50 text-emerald-700'
    }

    if (status === 'rejected') {
      return 'bg-red-50 text-red-700'
    }

    if (status === 'shortlisted') {
      return 'bg-indigo-50 text-brand'
    }

    return 'bg-amber-50 text-amber-700'
  }

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-10">

        {/* HEADER */}

        <div className="rounded-3xl bg-navy p-8 text-white">

          <p className="text-sm text-white/50">
            {user?.role?.toUpperCase()} DASHBOARD
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Welcome, {user?.name || 'there'}.
          </h1>

          <p className="mt-3 text-white/60">
            Manage your InternSphere journey from one place.
          </p>

        </div>


        {/* QUICK ACTIONS */}

        <div className="mt-6 grid gap-5 md:grid-cols-3">

          <Link
            to="/internships"
            className="rounded-3xl bg-white p-7 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft"
          >

            <BriefcaseBusiness className="text-brand" />

            <h3 className="mt-6 text-xl font-black">
              Internships
            </h3>

            <p className="mt-2 text-slate-500">
              Browse live opportunities.
            </p>

          </Link>


          <Link
            to="/dashboard"
            className="rounded-3xl bg-white p-7 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft"
          >

            <FileText className="text-brand" />

            <h3 className="mt-6 text-xl font-black">
              Applications
            </h3>

            <p className="mt-2 text-slate-500">
              Track your applications.
            </p>

          </Link>


          {canPost && (

            <Link
              to="/post-internship"
              className="rounded-3xl bg-white p-7 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-soft"
            >

              <PlusCircle className="text-brand" />

              <h3 className="mt-6 text-xl font-black">
                Post internship
              </h3>

              <p className="mt-2 text-slate-500">
                Publish a new opportunity.
              </p>

            </Link>

          )}

        </div>


        {/* STUDENT APPLICATIONS */}

        {user?.role === 'student' && (

          <section className="mt-10">

            <div className="flex items-end justify-between">

              <div>

                <p className="text-sm font-black tracking-widest text-brand">
                  YOUR ACTIVITY
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  My Applications
                </h2>

              </div>

              <Link
                to="/internships"
                className="hidden items-center gap-2 text-sm font-black text-brand sm:flex"
              >
                Find more internships
                <ArrowRight size={16} />
              </Link>

            </div>


            {/* LOADING */}

            {loading && (

              <div className="mt-6 rounded-3xl bg-white p-10 text-center ring-1 ring-slate-200">
                <p className="font-semibold text-slate-500">
                  Loading your applications…
                </p>
              </div>

            )}


            {/* EMPTY */}

            {!loading && applications.length === 0 && (

              <div className="mt-6 rounded-3xl bg-white p-10 text-center ring-1 ring-slate-200">

                <FileText
                  className="mx-auto text-slate-300"
                  size={42}
                />

                <h3 className="mt-4 text-xl font-black">
                  No applications yet
                </h3>

                <p className="mt-2 text-slate-500">
                  Explore internships and apply to your first opportunity.
                </p>

                <Link
                  to="/internships"
                  className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 font-black text-white"
                >
                  Browse Internships
                </Link>

              </div>

            )}


            {/* APPLICATION LIST */}

            {!loading && applications.length > 0 && (

              <div className="mt-6 space-y-4">

                {applications.map((application) => {

                  const internship = application.internship

                  return (

                    <div
                      key={application._id}
                      className="rounded-3xl bg-white p-6 ring-1 ring-slate-200 transition hover:shadow-soft"
                    >

                      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

                        <div className="flex gap-4">

                          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-xl font-black text-brand">
                            {internship?.companyName?.[0] || 'I'}
                          </div>

                          <div>

                            <h3 className="text-lg font-black">
                              {internship?.title || 'Internship'}
                            </h3>

                            <p className="mt-1 text-sm font-semibold text-slate-500">
                              {internship?.companyName || 'Company'}
                            </p>

                            <p className="mt-2 text-xs text-slate-400">
                              Applied on{' '}
                              {application.createdAt
                                ? new Date(
                                    application.createdAt
                                  ).toLocaleDateString()
                                : '—'}
                            </p>

                          </div>

                        </div>


                        <div className="flex items-center gap-3">

                          <span
                            className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-black capitalize ${statusClass(
                              application.status
                            )}`}
                          >

                            {statusIcon(application.status)}

                            {application.status || 'applied'}

                          </span>


                          {internship?._id && (

                            <Link
                              to={`/internships/${internship._id}`}
                              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-black transition hover:border-brand hover:text-brand"
                            >
                              View
                            </Link>

                          )}

                        </div>

                      </div>

                    </div>

                  )

                })}

              </div>

            )}

          </section>

        )}

      </main>
    </>
  )
}