import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
const goalData = [
  {
    name: 'No Poverty',
    color: '#e5243b',
    image: new URL('../lib/svgs/goal-1.svg', import.meta.url).href,
  },
  { name: 'Zero Hunger', color: '#dda63a' },
  { name: 'Good Health and Well-being', color: '#4c9f38' },
  { name: 'Quality Education', color: '#c5192d' },
  { name: 'Gender Equality', color: '#ff3a21' },
  { name: 'Clean Water and Sanitation', color: '#26bde2' },
  { name: 'Affordable and Clean Energy', color: '#fcc30b' },
  { name: 'Decent Work and Economic Growth', color: '#a21942' },
  { name: 'Industry, Innovation and Infrastructure', color: '#fd6925' },
  { name: 'Reduced Inequalities', color: '#dd1367' },
  { name: 'Sustainable Cities and Communities', color: '#fd9d24' },
  { name: 'Responsible Consumption and Production', color: '#bf8b2e' },
  { name: 'Climate Action', color: '#3f7e44' },
  { name: 'Life Below Water', color: '#0a97d9' },
  { name: 'Life on Land', color: '#56c02b' },
  { name: 'Peace, Justice and Strong Institutions', color: '#00689d' },
  { name: 'Partnerships for the Goals', color: '#19486a' },
];

export class sustainableGoals extends DDDSuper(LitElement) {

  static get tag() {
    return "sustainable-goals";
  }

  constructor() {
    super();
    this.goals="1";
    this.label="";
    this.alt=null;
    this.colorOnly=false;
    this._currentSrc=null;
    this.loading="lazy";
    this.fetchpriority="low";
  }

  static get properties() {
    return {
      goals: {type: String, reflect: true},
      colorOnly: {type: Boolean, attribute: "color-only", reflect: true},
      label: {type:String},
      _currentSrc: { type: String },
      loading: {type: String},
      fetchpriority: {type: String}

    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: white;
        width: 254px;
        height: 254px;
        font-family: var(--ddd-font-navigation);
        font-size: var(--sustainable-goals-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }
      .color-only{
        width:100%;
        height:100%;
      }
    `];
  }
  updated(changedProperties) {
    if (changedProperties.has('goal')) {
      this.updateGoalImage();
    }
  }

  updateGoalImage() {
    if (this.goal === 'all' || this.goal === 'circle') {
      this._currentSrc = new URL(
        `./lib/svgs/goal${this.goal}.svg`,
        import.meta.url
      ).href;
      this.alt =
        this.goal === 'all'
          ? 'All Sustainable Development Goals'
          : 'Sustainable Development Goals Circle';
    } else {
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) {
        this._currentSrc = new URL(
          `./lib/svgs/goal-${goalNumber}.svg`,
          import.meta.url
        ).href;
        this.alt = `Goal ${goalNumber}: ${goalData[goalNumber - 1].name}`;
      }
    }
  }

  render() {
    if (this.colorOnly) {
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) {
        const color = goalData[goalNumber - 1].color;
        return html`<div class="color-only" style="background-color: ${color};"></div>`;
      }
    }

    return html`
    <img
      src="${this._currentSrc}"
      alt="${this.label || this.alt}"
      loading="lazy"
      fetchpriority="low"
    />`;
  }


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(sustainableGoals.tag, sustainableGoals);