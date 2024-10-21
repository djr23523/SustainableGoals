import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
new URL(`../lib/svgs/goal1.svg`,import.meta.url).href

const goalData = [
  {
    name: 'No Poverty',
    color: '#e5243b',
    image: new URL('../lib/svgs/goal1.svg', import.meta.url).href,
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
    this._imgsrc= new URL(`../lib/svgs/goal1.svg`,import.meta.url).href;
    this.loading="lazy";
    this.fetchpriority="low";
  }

  static get properties() {
    return {
      goals: {type: String, reflect: true},
      colorOnly: {type: Boolean, attribute: "color-only", reflect: true},
      label: {type:String},
      _imgsrc: { type: String },
      loading: {type: String},
      fetchpriority: {type: String}

    };
  }
/*This defines the styles for the images, color box, and the page as a whole */
  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 254px;
        height: 254px;
      }
      img {
        width: 100%;
        height: 100%;
      }
      .color-only {
        width: 100%;
        height: 100%;
      }
    `;
  }
  /*This method updates the properties such as color only if the changed properties string has goal in it*/
  updated(changedProperties) {
    if (changedProperties.has('goal')) {
      this.updateGoalImage();
    }
  }
  getColor(){
    const goalNumber = parseInt(this.goal);
    if (goalNumber >= 1 && goalNumber <= 17) {
      const color = goalData[goalNumber - 1].color;
      return html`<div class="color-only" style="background-color: ${color};"></div>`;
    }
  }
/*This method activates only if the updated method's parameter has goal in it*/ 
  updateGoalImage() {
    /*Only activates if the goal has all or circle in it, so only for those two cases */
    if (this.goals === 'all') {
      this._imgsrc = new URL(
        `../lib/svgs/goal${this.goal}.svg`,
        import.meta.url
      ).href;
      this.alt =
        this.goals === 'all'
          ? 'All Sustainable Development Goals'
          : 'Sustainable Development Goals Circle';
    
    } 
    else if(this.goals==='circle'){
      this._imgsrc = new URL(
        `../lib/svgs/circle.png`,
        import.meta.url
      ).href;
      this.alt =
        this.goal === 'circle'
          ? 'All Sustainable Development Goals'
          : 'Sustainable Development Goals Circle';
    
    }
    else {/* This is for goals 1-17*/
      const goalNumber = parseInt(this.goals);
      if (goalNumber >= 1 && goalNumber <= 17) {
        this._imgsrc = new URL(
          `../lib/svgs/goal${goalNumber}.svg`,
          import.meta.url
        ).href;
        this.alt = `Goal ${goalNumber}: ${goalData[goalNumber - 1].name}`;
      }
    }
  }

  render() {/*This activates only if the colorOnly is set as true causing the color box to appear */
    if (this.colorOnly) {
      getColor()
      
    }
    
    this._imgsrc = new URL(
      `../lib/svgs/goal${this.goals}.svg`,
      import.meta.url
    ).href;
    this.alt=`Goal ${goalNumber}: ${goalData[goalNumber - 1].name}`;
/*This renders the page-allows the images to appear and allows for alt text loading is set as lazy and fetch priority as low */
    return html`
    <img
      src="${this._imgsrc}"
      alt="${this.label || this.alt}"
      loading="lazy"
      fetchpriority="low"
    />`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`../lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(sustainableGoals.tag, sustainableGoals);