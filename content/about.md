# About

## Who We Are

Conon Labs is a deep-technology company at the frontier of space and terrestrial electronics and software. We design, engineer, and deploy systems that operate where precision is non-negotiable.

## Our Mission

To standartize space communications in LEO by developing custom transceiver hardware operating with a custom scheduling protocol using commercial off the shelf hardware for the ground stations.

**The end goal** is to have a platform that does not require prior knowledge of the satellite's position to schedule a communication window, put simply, if the satellite is in view there is a window. This applies to all satellites using our protocol, meaning that multiple satellites can use the same window/ ground station to communicate **at the same time** using the protocol's dynamic time slot allocation.

<img src="assets/images/gs-sats.png" alt="Ground station and satellites diagram" class="md-image" />

### Steps to achieve that

- **Develop tranceiver** - Using cost effective hardware and having complete control over low level firmware operations. This will be critical in validating the concept during TRL 9.
- **Develop GS software** - Using a commercial SDR (eg USRP B200) verify protocol operation between the traceiver(s) and SDR. Easy to scale.
- **Bring space to the web** - Utilize existing web infrastucture knowledge to bring all ground stations control into a centralized web application. Commanding an telemetry goes through one platform, scheduling happens automatically.

## Our Values

- **Precision** - Every component, every line of code, engineered to spec.
- **Reliability** - Systems that perform when failure is not an option.
- **Innovation** - Pushing boundaries in embedded systems, RF engineering, and autonomous software.
- **Speed** -  Quick itterations of concepts aiming to quickly validate what works and what doesn't.