// Snapshot from GET /api/v1/broadcast-units/published on 2026-10-25. Source updatedAt: 2026-01-01T10:26:57.115Z.
import type { BroadcastUnitInput } from '../schema'

export const studio1 = {
  "slug": "studio-1",
  "kind": "studio",
  "title": "Studio 1",
  "summary": "600 SQM broadcast-ready studio facility with full production, audio, intercom, and monitoring infrastructure.",
  "published": true,
  "order": 1,
  "meta": {
    "title": "Studio 1 | Broadcast Studio | MAP",
    "description": "Studio 1 is a 600 square metre broadcast-ready studio in Dubai, with a lighting grid, control rooms, and a full vision, audio, and intercom inventory."
  },
  "specs": {
    "visionMixers": [
      "FOR-A HVS-492WOU",
      "FOR-A HVS-490"
    ],
    "routing": "64x64",
    "audioMixer": "Midas M32",
    "intercom": [
      "RTS Odin"
    ],
    "useCases": [
      "TV Production",
      "Live Shows",
      "Interviews",
      "Events Coverage"
    ],
    "areaSqm": 600,
    "features": [
      "Lighting Grid",
      "Basic Lighting",
      "Makeup Room",
      "Changing Room",
      "Guest Room",
      "Edit Room"
    ],
    "broadcastReady": true,
    "wirelessAudio": "Sennheiser EW500 G3"
  },
  "items": [
    {
      "group": "VISION_MIXING",
      "title": "FOR-A Video Switcher 2ME HVS-492WOU",
      "qty": 1,
      "order": 1
    },
    {
      "group": "VISION_MIXING",
      "title": "FOR-A Video Switcher 2ME HVS-490",
      "qty": 1,
      "order": 2
    },
    {
      "group": "CAMERAS",
      "title": "Grass Valley Focus Triax Base Unit (Fischer)",
      "qty": 6,
      "order": 3
    },
    {
      "group": "CAMERAS",
      "title": "Grass Valley Focus 70 1080i",
      "qty": 6,
      "order": 4
    },
    {
      "group": "CAMERAS",
      "title": "Grass Valley OCP400",
      "qty": 6,
      "order": 5
    },
    {
      "group": "ROUTING",
      "title": "64x64 Router MFR-64RUW with 4 Panels",
      "qty": 1,
      "order": 6
    },
    {
      "group": "ROUTING",
      "title": "Nevion Glue",
      "qty": 1,
      "order": 7
    },
    {
      "group": "PLAYOUT_GRAPHICS",
      "title": "FOR-A Insight Video Server PC",
      "qty": 1,
      "order": 8
    },
    {
      "group": "PLAYOUT_GRAPHICS",
      "title": "Title Box CG",
      "qty": 1,
      "order": 9
    },
    {
      "group": "LENSES",
      "title": "Fujinon XA17x7.6BRM Normal Lens (Full Servo)",
      "qty": 5,
      "order": 10
    },
    {
      "group": "LENSES",
      "title": "Canon J11Ax4 Wide Angle Lens (Full Servo)",
      "qty": 1,
      "order": 11
    },
    {
      "group": "CAMERA_SUPPORT",
      "title": "Libec Tripod",
      "qty": 5,
      "order": 12
    },
    {
      "group": "CAMERA_SUPPORT",
      "title": "Triangle Camera Crane 13m (4 Silver Boxes, 1 Black Box Head)",
      "qty": 1,
      "order": 13
    },
    {
      "group": "RECORDING_REPLAY",
      "title": "Blackmagic Recorder",
      "qty": 4,
      "order": 14
    },
    {
      "group": "MONITORING",
      "title": "Tektronix WVR 7020",
      "qty": 1,
      "order": 15
    },
    {
      "group": "MONITORING",
      "title": "Broadcast Monitor",
      "qty": 1,
      "order": 16
    },
    {
      "group": "MONITORING",
      "title": "Multiviewer Monitors",
      "qty": 4,
      "order": 17
    },
    {
      "group": "INTERCOM",
      "title": "RTS ODIN Intercom Talkback with 4 Panels",
      "qty": 1,
      "order": 18
    },
    {
      "group": "AUDIO",
      "title": "M32 Audio Mixer with Stage Box",
      "qty": 1,
      "order": 19
    },
    {
      "group": "RF_WIRELESS",
      "title": "Sennheiser EW500 G3 Neck Mic Receiver",
      "qty": 5,
      "order": 20
    },
    {
      "group": "RF_WIRELESS",
      "title": "Sennheiser EW500 G3 Neck Mic Transmitter",
      "qty": 5,
      "order": 21
    },
    {
      "group": "NETWORKING",
      "title": "Networked Digital Audio",
      "qty": 1,
      "order": 22
    },
    {
      "group": "STUDIO_TOOLS",
      "title": "Autoscript",
      "qty": 2,
      "order": 23
    }
  ],
  "gallery": []
} satisfies BroadcastUnitInput
