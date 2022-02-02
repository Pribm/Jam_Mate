import * as React from "react"

import * as Tone from 'tone'


const SynthSvg = (props) => {

  let sampler = null

    React.useEffect(() => {

      let keys = document.querySelectorAll('.black_key,.white_key')
      
      sampler = new Tone.Sampler({
        urls: {
          A1: "A1.mp3",
          A2: "A2.mp3",
        },
        baseUrl: "https://tonejs.github.io/audio/casio/",
        onload: () => {
          keys.forEach(key => {
            key.addEventListener('mousedown', playNote)
          })
        }
      }).toDestination();

    },[])

    const playNote = e => {
      sampler.triggerAttackRelease(e.currentTarget.id, 0.5)
    }

  return (
    <div className="bg-warning rounded-pill position-relative">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 380.94 292.09"
        {...props}
        style={{width: '100%'}}
      >
        <defs>
          <style>
            {
              ".black_key,.cls-2{fill:#231f1a}.black_key:active{fill:#000}.white_key{fill:#f4f2f5}.white_key:active{fill:gray}.cls-4{fill:#4f4748}.cls-5{fill:#14110f}.cls-6{fill:#1a1714}.cls-7{fill:#7b7575}"
            }
          </style>
        </defs>
        <g id="Layer_1" data-name="Layer 1">
          <path
            style={{
              fill: "#e31ee8",
            }}
            d="M8.13 7.72H372.8v276.65H8.13z"
          />
          <path className="cls-2" d="M21.68 7.72h337.57v276.65H21.68z" />
          <g id="key_group">
          <path
            id="C4"
            className="white_key"
            d="M121.58 163.52h22.13v115.16h-22.13z"
          />
          <path
            id="E4"
            data-name="white_key"
            className="white_key"
            d="M167.93 163.52h21.97v115.16h-21.97z"
          />
          <path
            id="B3"
            data-name="white_key"
            className="white_key"
            d="M98.47 163.52h21.98v115.16H98.47z"
          />
          <path
            id="D4"
            data-name="white_key"
            className="white_key"
            d="M144.84 163.52h21.96v115.16h-21.96z"
          />
          <path
            id="G3"
            data-name="white_key"
            className="white_key"
            d="M52.13 163.52h21.96v115.16H52.13z"
          />
          <path
            id="A3"
            data-name="white_key"
            className="white_key"
            d="M75.22 163.52h22.13v115.16H75.22z"
          />
          <path
            id="F3"
            data-name="white_key"
            className="white_key"
            d="M28.46 163.52H51v115.16H28.46z"
          />
          <path
            id="D5"
            data-name="white_key"
            className="white_key"
            d="M306.85 163.52h21.97v115.16h-21.97z"
          />
          <path
            id="E5"
            data-name="white_key"
            className="white_key"
            d="M329.94 163.52h22.54v115.16h-22.54z"
          />
          <path
            id="C5"
            data-name="white_key"
            className="white_key"
            d="M283.59 163.52h22.13v115.16h-22.13z"
          />
          <path
            id="B4"
            data-name="white_key"
            className="white_key"
            d="M260.49 163.52h21.98v115.16h-21.98z"
          />
          <path
            id="F4"
            data-name="white_key"
            className="white_key"
            d="M191.03 163.52H213v115.16h-21.97z"
          />
          <path
            id="G4"
            data-name="white_key"
            className="white_key"
            d="M214.14 163.52h21.96v115.16h-21.96z"
          />
          <path
            id="A4"
            data-name="white_key"
            className="white_key"
            d="M237.23 163.52h22.13v115.16h-22.13z"
          />
          <path
            id="F#3"
            className="black_key"
            d="M45.31 163.52h12.5v66.61h-12.5z"
          />
          <path
            id="G#3"
            data-name="black_key"
            className="black_key"
            d="M68.4 163.52h12.5v66.61H68.4z"
          />
          <path
            id="A#3"
            data-name="black_key"
            className="black_key"
            d="M91.66 163.52h12.5v66.61h-12.5z"
          />
          <path
            id="C#4"
            data-name="black_key"
            className="black_key"
            d="M138.02 163.52h12.5v66.61h-12.5z"
          />
          <path
            id="D#4"
            data-name="black_key"
            className="black_key"
            d="M161.11 163.52h12.5v66.61h-12.5z"
          />
          <path
            id="F#4"
            data-name="black_key"
            className="black_key"
            d="M207.32 163.52h12.5v66.61h-12.5z"
          />
          <path
            id="G#4"
            data-name="black_key"
            className="black_key"
            d="M230.41 163.52h12.5v66.61h-12.5z"
          />
          <path
            id="A#4"
            data-name="black_key"
            className="black_key"
            d="M253.67 163.52h12.5v66.61h-12.5z"
          />
          <path
            id="C#5"
            data-name="black_key"
            className="black_key"
            d="M300.03 163.52h12.5v66.61h-12.5z"
          />
          <path
            id="D#5"
            data-name="black_key"
            className="black_key"
            d="M323.13 163.52h12.5v66.61h-12.5z"
          />
          </g>
          <path className="cls-4" d="M53.29 32.93h59.86V136.8H53.29z" />
          <g id="fader_slide">
            <path
              className="cls-2"
              d="M72.79 93.71h20.87v31.33H72.79zM72.79 44.69h20.87v31.33H72.79z"
            />
            <path className="cls-5" d="M83.79 121.56h-1.13V49.3h1.13v72.26z" />
            <g id="fader">
              <path
                className="cls-5"
                d="m72.79 76.02-3.39 3.11h20.87V90.6H69.4l3.39 3.11h20.87V76.02H72.79z"
              />
              <path className="cls-6" d="M69.4 79.13h20.87v11.48H69.4z" />
            </g>
          </g>
          <path
            className="cls-4"
            d="M119.93 32.93h206.55v48.81H119.93zM119.93 87.99h206.55v48.81H119.93z"
          />
          
        </g>
        </svg>
    </div>
  )
}

export default SynthSvg
