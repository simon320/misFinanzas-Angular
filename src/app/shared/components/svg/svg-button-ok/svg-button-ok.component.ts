import { Component } from '@angular/core';

@Component({
  selector: 'app-svg-button-ok',
  standalone: true,
  template: `
        <svg width="65" height="65" viewBox="0 0 91 91">
          <defs>
            <filter id="Elipse_8" x="0" y="0" width="91" height="91" filterUnits="userSpaceOnUse">
              <feOffset dy="5" input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="6" result="blur"/>
              <feFlood flood-color="#10161e"/>
              <feComposite operator="in" in2="blur"/>
              <feComposite in="SourceGraphic"/>
            </filter>
            <filter id="Elipse_8-2" x="0" y="0" width="91" height="91" filterUnits="userSpaceOnUse">
              <feOffset dy="7" input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="5.5" result="blur-2"/>
              <feFlood flood-color="#4cd2bc" result="color"/>
              <feComposite operator="out" in="SourceGraphic" in2="blur-2"/>
              <feComposite operator="in" in="color"/>
              <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
          </defs>
          <g id="Button_add" data-name="Button add" transform="translate(18 13)">
            <g data-type="innerShadowGroup">
              <g transform="matrix(1, 0, 0, 1, -18, -13)" filter="url(#Elipse_8)">
                <circle id="Elipse_8-3" data-name="Elipse 8" cx="27.5" cy="27.5" r="27.5" transform="translate(18 13)" fill="#01c38d"/>
              </g>
              <g transform="matrix(1, 0, 0, 1, -18, -13)" filter="url(#Elipse_8-2)">
                <circle id="Elipse_8-4" data-name="Elipse 8" cx="27.5" cy="27.5" r="27.5" transform="translate(18 13)" fill="#fff"/>
              </g>
            </g>
            <path id="Trazado_33" data-name="Trazado 33" d="M0,0A22.6,22.6,0,0,1,7.3,5.725c3.162,3.86,3.177,9.344,3.177,9.344" transform="translate(16.5 26.312)" fill="none" stroke="#191e29" stroke-linecap="round" stroke-width="6"/>
            <line id="Línea_44" data-name="Línea 44" x1="10.747" y2="27.78" transform="translate(27.5 13.72)" fill="none" stroke="#191e29" stroke-linecap="round" stroke-width="6"/>
          </g>
        </svg>
    `,
})
export class SvgButtonOk{}
