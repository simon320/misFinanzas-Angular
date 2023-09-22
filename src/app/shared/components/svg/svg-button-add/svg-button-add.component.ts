import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-button-add',
  standalone: true,
  template: `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="115" height="115" viewBox="0 0 61 61">
        <defs>
          <filter id="Elipse_8" x="0" y="0" width="61" height="61" filterUnits="userSpaceOnUse">
            <feOffset dy="5" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feFlood flood-color="#10161e"/>
            <feComposite operator="in" in2="blur"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="Elipse_8-2" x="0" y="0" width="61" height="61" filterUnits="userSpaceOnUse">
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
              <circle id="Elipse_8-3" data-name="Elipse 8" cx="12.5" cy="12.5" r="12.5" transform="translate(18 13)" fill="#01c38d"/>
            </g>
            <g transform="matrix(1, 0, 0, 1, -18, -13)" filter="url(#Elipse_8-2)">
              <circle id="Elipse_8-4" data-name="Elipse 8" cx="12.5" cy="12.5" r="12.5" transform="translate(18 13)" fill="#fff"/>
            </g>
          </g>
          <path id="Trazado_34" data-name="Trazado 34" d="M12.669,0H22.7" transform="translate(-5.47 12.581)" fill="none" stroke="#191e29" stroke-linecap="square" stroke-width="3"/>
          <line id="Línea_18" data-name="Línea 18" y2="10" transform="translate(12.5 7.5)" fill="none" stroke="#191e29" stroke-linecap="square" stroke-width="3"/>
        </g>
      </svg>
    `,
})
export class SvgButtonAdd{}