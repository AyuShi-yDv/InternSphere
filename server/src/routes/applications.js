const router = require('express').Router()

const Application = require('../models/Application')
const Internship = require('../models/Internship')

const auth = require('../middleware/auth')
const roles = require('../middleware/roles')


// ======================================================
// STUDENT — APPLY TO INTERNSHIP
// ======================================================

router.post(
  '/',
  auth,
  roles('student'),
  async (req, res) => {

    try {

      const internship = await Internship.findById(
        req.body.internshipId
      )

      if (!internship) {
        return res.status(404).json({
          success: false,
          message: 'Internship not found'
        })
      }


      // Prevent duplicate applications

      const existingApplication =
        await Application.findOne({
          student: req.user.id,
          internship: internship._id
        })

      if (existingApplication) {
        return res.status(409).json({
          success: false,
          message: 'Already applied'
        })
      }


      const application = await Application.create({
        student: req.user.id,
        internship: internship._id
      })


      // Real-time notification

      req.app
        .get('io')
        .emit('application:created', application)


      res.status(201).json({
        success: true,
        data: application
      })

    } catch (e) {

      res.status(400).json({
        success: false,
        message: e.message
      })

    }

  }
)


// ======================================================
// STUDENT — MY APPLICATIONS
// ======================================================

router.get(
  '/mine',
  auth,
  roles('student'),
  async (req, res) => {

    try {

      const applications =
        await Application
          .find({
            student: req.user.id
          })
          .populate('internship')
          .sort({
            createdAt: -1
          })


      res.json({
        success: true,
        data: applications
      })

    } catch (e) {

      res.status(500).json({
        success: false,
        message: e.message
      })

    }

  }
)


// ======================================================
// RECRUITER / ADMIN — VIEW APPLICANTS
// ======================================================

router.get(
  '/internship/:internshipId',
  auth,
  roles('admin', 'recruiter'),
  async (req, res) => {

    try {

      const internship =
        await Internship.findById(
          req.params.internshipId
        )

      if (!internship) {

        return res.status(404).json({
          success: false,
          message: 'Internship not found'
        })

      }


      // Recruiters can only see applications
      // for internships they created.

      if (
        req.user.role === 'recruiter' &&
        String(internship.createdBy) !== String(req.user.id)
      ) {

        return res.status(403).json({
          success: false,
          message: 'You are not allowed to view these applicants'
        })

      }


      const applications =
        await Application
          .find({
            internship: internship._id
          })
          .populate(
            'student',
            'name email'
          )
          .populate(
            'internship',
            'title companyName'
          )
          .sort({
            createdAt: -1
          })


      res.json({
        success: true,
        data: applications
      })

    } catch (e) {

      res.status(500).json({
        success: false,
        message: e.message
      })

    }

  }
)


// ======================================================
// RECRUITER / ADMIN — UPDATE APPLICATION STATUS
// ======================================================

router.patch(
  '/:id/status',
  auth,
  roles('admin', 'recruiter'),
  async (req, res) => {

    try {

      const allowedStatuses = [
        'applied',
        'shortlisted',
        'rejected',
        'accepted'
      ]


      const { status } = req.body


      if (!allowedStatuses.includes(status)) {

        return res.status(400).json({
          success: false,
          message:
            'Invalid status. Use applied, shortlisted, rejected or accepted.'
        })

      }


      const application =
        await Application
          .findById(req.params.id)
          .populate('internship')


      if (!application) {

        return res.status(404).json({
          success: false,
          message: 'Application not found'
        })

      }


      // Recruiter can only update applications
      // belonging to their own internship.

      if (
        req.user.role === 'recruiter' &&
        String(application.internship.createdBy) !==
          String(req.user.id)
      ) {

        return res.status(403).json({
          success: false,
          message: 'You are not allowed to update this application'
        })

      }


      application.status = status

      await application.save()


      // Real-time status update

      req.app
        .get('io')
        .emit(
          'application:status-updated',
          application
        )


      res.json({
        success: true,
        data: application
      })

    } catch (e) {

      res.status(400).json({
        success: false,
        message: e.message
      })

    }

  }
)


module.exports = router