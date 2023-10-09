import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-button-close-red',
  standalone: true,
  template: `
        <svg width="65" height="65" viewBox="0 0 91 91">
          <defs>
            <filter id="Trazado_41" x="0" y="0" width="91" height="91" filterUnits="userSpaceOnUse">
              <feOffset dy="5" input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="6" result="blur"/>
              <feFlood flood-color="#10161e"/>
              <feComposite operator="in" in2="blur"/>
              <feComposite in="SourceGraphic"/>
            </filter>
            <filter id="Trazado_41-2" x="0" y="0" width="91" height="91" filterUnits="userSpaceOnUse">
              <feOffset dy="7" input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="5.5" result="blur-2"/>
              <feFlood flood-color="#f8203e" flood-opacity="0.938" result="color"/>
              <feComposite operator="out" in="SourceGraphic" in2="blur-2"/>
              <feComposite operator="in" in="color"/>
              <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
          </defs>
          <g id="Componente_51_1" data-name="Componente 51 – 1" transform="translate(18 13)">
            <g data-type="innerShadowGroup">
              <g transform="matrix(1, 0, 0, 1, -18, -13)" filter="url(#Trazado_41)">
                <path id="Trazado_41-3" data-name="Trazado 41" d="M27.5,0A27.5,27.5,0,1,1,0,27.5,27.5,27.5,0,0,1,27.5,0Z" transform="translate(18 13)" fill="rgba(248,32,62,0.97)"/>
              </g>
              <g transform="matrix(1, 0, 0, 1, -18, -13)" filter="url(#Trazado_41-2)">
                <path id="Trazado_41-4" data-name="Trazado 41" d="M27.5,0A27.5,27.5,0,1,1,0,27.5,27.5,27.5,0,0,1,27.5,0Z" transform="translate(18 13)" fill="#fff"/>
              </g>
            </g>
            <line id="Línea_44" data-name="Línea 44" x1="23" y2="25" transform="translate(16.5 14.5)" fill="none" stroke="#191e29" stroke-linecap="round" stroke-width="6"/>
            <line id="Línea_79" data-name="Línea 79" x2="23" y2="25.49" transform="translate(16.5 14.5)" fill="none" stroke="#191e29" stroke-linecap="round" stroke-width="6"/>
          </g>
        </svg>
    `,
})
export class SvgButtonCloseRed{}
