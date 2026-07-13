<p class="doc-kicker">Prototype Log — Dynamic Slot Allocation Protocol</p>

# Our Progress

To test the protocol properly, we broke down how the RF chain interacts with our custom baseband handling, validating the scheduling logic independently of the radio hardware.

## RF Breakdown

<figure style="margin: 44px 0 0;">
  <div style="border: 1px solid var(--line); border-radius: 16px; background: #171717; padding: 40px; display: flex; justify-content: center;">
    <img src="/assets/images/rfstart.png" alt="RF Breakdown" style="display: block; width: 100%; max-width: 560px; margin: 0;" />
  </div>
  <figcaption style="margin: 14px 2px 0; font-size: 11px; letter-spacing: 0.06em; color: var(--muted);">Baseband handling retained, the RF chain discarded from the DAC/ADC stage onward.</figcaption>
</figure>

Testing was performed by keeping the baseband handling and discarding the RF chain from the DAC/ADC point onward. One device acted as a ground station, communicating with the computer over serial, while two devices wired in parallel stood in as satellites.

## Proof-of-Concept Setup

<figure style="margin: 44px 0 0;">
  <div style="border: 1px solid var(--line); border-radius: 16px; background: #171717; padding: 40px; display: flex; justify-content: center;">
    <img src="/assets/images/rftest.png" alt="Test setup" style="display: block; width: 100%; max-width: 560px; margin: 0;" />
  </div>
  <figcaption style="margin: 14px 2px 0; font-size: 11px; letter-spacing: 0.06em; color: var(--muted);">Ground station and two parallel &ldquo;satellite&rdquo; devices simulating the RF link.</figcaption>
</figure>

This lets us successfully test the dynamic slot-allocation protocol for "parallel" communication with the available satellites, while simulating the RF connection.

## The Prototype Dashboard

The service handling the ground-station device was developed and wired to the backend and frontend of the dashboard. The globe animation illustrates the calculated orbital movement of the satellites, derived from their TLEs.

<figure style="margin: 44px 0 0;">
  <div style="border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: var(--bg2);">
    <img src="/assets/images/Dashb-1.png" alt="Dashboard — orbital view" style="display: block; width: 100%; margin: 0;" />
  </div>
  <figcaption style="margin: 14px 2px 0; font-size: 11px; letter-spacing: 0.06em; color: var(--muted);">Live orbital propagation from TLE data.</figcaption>
</figure>

<div style="margin: 32px 0; border: 1px solid var(--line); border-radius: 14px; background: var(--bg2); overflow: hidden;">
  <div style="display: flex; flex-wrap: wrap; gap: 20px; padding: 16px 22px; border-bottom: 1px solid var(--line);">
    <span style="flex: 0 0 150px; color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.08em; line-height: 1.7;">In View</span>
    <span style="flex: 1; min-width: 220px; color: var(--dim); font-size: 13px; line-height: 1.7;">The satellites currently within the ground station&rsquo;s coverage window.</span>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 20px; padding: 16px 22px; border-bottom: 1px solid var(--line);">
    <span style="flex: 0 0 150px; color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.08em; line-height: 1.7;">Send Command</span>
    <span style="flex: 1; min-width: 220px; color: var(--dim); font-size: 13px; line-height: 1.7;">Schedules a command to run the next time the specified satellite is available.</span>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 20px; padding: 16px 22px;">
    <span style="flex: 0 0 150px; color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.08em; line-height: 1.7;">Periodic Commands</span>
    <span style="flex: 1; min-width: 220px; color: var(--dim); font-size: 13px; line-height: 1.7;">Ensures a specified command for a specified satellite is scheduled at least once within a defined interval.</span>
  </div>
</div>

<figure style="margin: 44px 0 0;">
  <div style="border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: var(--bg2);">
    <img src="/assets/images/Dashb-2.png" alt="Dashboard — command panels" style="display: block; width: 100%; margin: 0;" />
  </div>
  <figcaption style="margin: 14px 2px 0; font-size: 11px; letter-spacing: 0.06em; color: var(--muted);">Command scheduling and periodic-command panels.</figcaption>
</figure>

<div style="margin: 32px 0; border: 1px solid var(--line); border-radius: 14px; background: var(--bg2); overflow: hidden;">
  <div style="display: flex; flex-wrap: wrap; gap: 20px; padding: 16px 22px; border-bottom: 1px solid var(--line);">
    <span style="flex: 0 0 150px; color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.08em; line-height: 1.7;">Command Log</span>
    <span style="flex: 1; min-width: 220px; color: var(--dim); font-size: 13px; line-height: 1.7;">Every command that is scheduled or has already run.</span>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 20px; padding: 16px 22px; border-bottom: 1px solid var(--line);">
    <span style="flex: 0 0 150px; color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.08em; line-height: 1.7;">Telemetry Detail</span>
    <span style="flex: 1; min-width: 220px; color: var(--dim); font-size: 13px; line-height: 1.7;">Opens on any selected command to show its full detail.</span>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 20px; padding: 16px 22px;">
    <span style="flex: 0 0 150px; color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.08em; line-height: 1.7;">Live Feed</span>
    <span style="flex: 1; min-width: 220px; color: var(--dim); font-size: 13px; line-height: 1.7;">All activity passing through the GS module and GS service, such as the satellite identify function.</span>
  </div>
</div>

<figure style="margin: 44px 0 0;">
  <div style="border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: var(--bg2);">
    <img src="/assets/images/Dashb-3.png" alt="Dashboard — command log and live feed" style="display: block; width: 100%; margin: 0;" />
  </div>
  <figcaption style="margin: 14px 2px 0; font-size: 11px; letter-spacing: 0.06em; color: var(--muted);">Command log, telemetry detail, and live activity feed.</figcaption>
</figure>

## The Proof of Concept

We cut power to SAT1 so it disappears from the "In View" panel, simulating the satellite leaving the ground station's coverage. The dashboard reports how long ago the missing satellite was last available.

<figure style="margin: 44px 0 0;">
  <div style="border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: var(--bg2);">
    <img src="/assets/images/sat-miss.png" alt="SAT1 out of coverage" style="display: block; width: 100%; margin: 0;" />
  </div>
  <figcaption style="margin: 14px 2px 0; font-size: 11px; letter-spacing: 0.06em; color: var(--muted);">SAT1 dropped from coverage, last-seen time tracked.</figcaption>
</figure>

During this window we scheduled three commands for SAT1 and one for SAT2. The SAT1 commands are held as pending while it is unavailable; the SAT2 command executes immediately.

<figure style="margin: 44px 0 0;">
  <div style="border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: var(--bg2);">
    <img src="/assets/images/sat-pending.png" alt="Commands pending for SAT1" style="display: block; width: 100%; margin: 0;" />
  </div>
  <figcaption style="margin: 14px 2px 0; font-size: 11px; letter-spacing: 0.06em; color: var(--muted);">SAT1 commands queued as pending, SAT2 command runs at once.</figcaption>
</figure>

In the video below, SAT1 is reconnected to power, and the moment the ground station recognizes it as available, the pending commands are sent.

<figure style="margin: 44px 0 0;">
  <div style="border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: var(--bg2);">
    <video autoplay loop muted playsinline poster="/assets/images/Dashb-1.png" style="display: block; width: 100%; margin: 0; border: none;">
      <source src="/assets/images/sat-respond.mp4" type="video/mp4">
      Your browser doesn't support embedded video.
    </video>
  </div>
  <figcaption style="margin: 14px 2px 0; font-size: 11px; letter-spacing: 0.06em; color: var(--muted);">SAT1 was connected as recording began, it takes a few seconds to start up.</figcaption>
</figure>

## File Management

The service was extended with a file management control block, wired to both upload and download workflows.

<figure style="margin: 44px 0 0;">
  <div style="width: 60%; margin: 0 auto; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: var(--bg2);">
    <img src="/assets/images/file_management_block.png" alt="File management control block" style="display: block; width: 100%; margin: 0;" />
  </div>
</figure>

<div style="margin: 32px 0; border: 1px solid var(--line); border-radius: 14px; background: var(--bg2); overflow: hidden;">
  <div style="display: flex; flex-wrap: wrap; gap: 20px; padding: 16px 22px; border-bottom: 1px solid var(--line);">
    <span style="flex: 0 0 150px; color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.08em; line-height: 1.7;">Satellite ID</span>
    <span style="flex: 1; min-width: 220px; color: var(--dim); font-size: 13px; line-height: 1.7;">Chooses the target satellite, used for both uploads and downloads.</span>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 20px; padding: 16px 22px; border-bottom: 1px solid var(--line);">
    <span style="flex: 0 0 150px; color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.08em; line-height: 1.7;">Filename</span>
    <span style="flex: 1; min-width: 220px; color: var(--dim); font-size: 13px; line-height: 1.7;">The file to be downloaded from the satellite.</span>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 20px; padding: 16px 22px;">
    <span style="flex: 0 0 150px; color: var(--accent); font-weight: 500; font-size: 12px; letter-spacing: 0.08em; line-height: 1.7;">Choose File</span>
    <span style="flex: 1; min-width: 220px; color: var(--dim); font-size: 13px; line-height: 1.7;">Selects the local file to be uploaded to the satellite, sent via the Upload button.</span>
  </div>
</div>

Below, files are uploaded to two satellites in parallel.

<figure style="margin: 44px 0 0;">
  <div style="width: 60%; margin: 0 auto; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: var(--bg2);">
    <img src="/assets/images/parallel_upload.png" alt="Parallel upload to two satellites" style="display: block; width: 100%; margin: 0;" />
  </div>
</figure>
<br>
The files are broken into chunks, uploaded or downloaded as distinct packets, and then they are either re-built in the database or the satellite respectively.

<figure style="margin: 44px 0 0;">
  <div style="width: 60%; margin: 0 auto; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: var(--bg2);">
    <img src="/assets/images/file_spec_log.png" alt="File chunk transfer log" style="display: block; width: 100%; margin: 0;" />
  </div>
</figure>
<br>
In case a file is downloaded from the satellite the option button "SAVE" is shown where the user has the option to download the file from the database to their local device.

To find out the contents of the satellite you can send the command file_list and the satellite reports back its contents.

<figure style="margin: 44px 0 0;">
  <div style="width: 60%; margin: 0 auto; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: var(--bg2);">
    <img src="/assets/images/file_list_cmd.png" alt="file_list command output" style="display: block; width: 100%; margin: 0;" />
  </div>
</figure>