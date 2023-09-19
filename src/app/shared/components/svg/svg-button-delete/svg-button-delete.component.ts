import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-button-delete',
  standalone: true,
  template: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="67.002" height="67.002" viewBox="0 0 67.002 67.002">
        <defs>
            <filter id="Trazado_16" x="0" y="0" width="67.002" height="67.002" filterUnits="userSpaceOnUse">
            <feOffset dy="5" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feFlood flood-color="#10161e"/>
            <feComposite operator="in" in2="blur"/>
            <feComposite in="SourceGraphic"/>
            </filter>
            <filter id="Trazado_16-2" x="0" y="0" width="67.002" height="67.002" filterUnits="userSpaceOnUse">
            <feOffset dy="7" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="5.5" result="blur-2"/>
            <feFlood flood-color="#bebfbf" flood-opacity="0.218" result="color"/>
            <feComposite operator="out" in="SourceGraphic" in2="blur-2"/>
            <feComposite operator="in" in="color"/>
            <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
        </defs>
        <g id="Button_Close" data-name="Button Close" transform="translate(18 13)">
            <g data-type="innerShadowGroup">
            <g transform="matrix(1, 0, 0, 1, -18, -13)" filter="url(#Trazado_16)">
                <path id="Trazado_16-3" data-name="Trazado 16" d="M10.961,0A10.961,10.961,0,1,1,0,10.961,10.961,10.961,0,0,1,10.961,0Z" transform="translate(33.5 13) rotate(45)" fill="rgba(190,191,191,0.41)"/>
            </g>
            <g transform="matrix(1, 0, 0, 1, -18, -13)" filter="url(#Trazado_16-2)">
                <path id="Trazado_16-4" data-name="Trazado 16" d="M10.961,0A10.961,10.961,0,1,1,0,10.961,10.961,10.961,0,0,1,10.961,0Z" transform="translate(33.5 13) rotate(45)" fill="#fff"/>
            </g>
            </g>
            <line id="Línea_17" data-name="Línea 17" x2="12.956" transform="translate(10.878 10.963) rotate(45)" fill="none" stroke="#191e29" stroke-linecap="square" stroke-width="3"/>
            <line id="Línea_18" data-name="Línea 18" y2="13.066" transform="translate(20.163 10.924) rotate(45)" fill="none" stroke="#191e29" stroke-linecap="square" stroke-width="3"/>
        </g>
        </svg>
    `,
})
export class SvgButtonDelete{}
