
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";




export class sustainableGoals extends DDDSuper(LitElement) {

  static get tag() {
    return "sustainable-goals";
  }

  constructor() {
    super();
    this.goals="1";
    this.label="";
    this.colorOnly=false;
    this.loading="lazy";
    this.fetchpriority="low";
  }

  static get properties() {
    return {
      goals: {type: String, reflect: true},
      colorOnly: {type: Boolean, attribute: "color-only", reflect: true},
      label: {type:String},
      loading: {type: String},
      fetchpriority: {type: String}

    };
  }
//This defines the styles for the images, color box, and the page as a whole 
  static get styles() {
    return css`
      :host {
        --sg-goals-1: rgb(235, 28, 44);
        --sg-goals-2: rgb(210, 160, 42);
        --sg-goals-3: rgb(44, 155, 72);
        --sg-goals-4: rgb(194, 31, 51);
        --sg-goals-5: rgb(239, 64, 42);
        --sg-goals-6: rgb(0, 173, 216);
        --sg-goals-7: rgb(253, 183, 19);
        --sg-goals-8: rgb(143, 23, 55);
        --sg-goals-9: rgb(243, 109, 36);
        --sg-goals-10: rgb(224, 21, 131);
        --sg-goals-11: rgb(249, 157, 37);
        --sg-goals-12: rgb(207, 141, 42);
        --sg-goals-13: rgb(72, 119, 61);
        --sg-goals-14: rgb(0, 125, 187);
        --sg-goals-15: rgb(63, 175, 73);
        --sg-goals-16: rgb(1, 85, 138);
        --sg-goals-17: rgb(25, 54, 103);
    
        display: block;
        width: 254px;
        height: 254px;
      }
      img {
        width: 100%;
        height: 100%;
      }
      .color-only{

        width: 254px;
        height: 254px;
        
      }
    `;
  }
  //This method updates the properties such as color only if the changed properties string has goal in it
  updated(changedProperties) {
    if (changedProperties.has('goals')) {
      this.updateGoalImage();
    }
  }
  
//This method activates only if the updated method's parameter has goal in it 
  updateGoalImage() {
    let _imgsrc;
    //Only activates if the goal has all or circle in it, so only for those two cases 
    const goalData = [
      'No Poverty',
      'Zero Hunger',
      'Good Health and Well-being',
      'Quality Education',
      'Gender Equality',
      'Clean Water and Sanitation',
      'Affordable and Clean Energy',
      'Decent Work and Economic Growth',
      'Industry, Innovation and Infrastructure',
      'Reduced Inequalities',
      'Sustainable Cities and Communities',
      'Responsible Consumption and Production',
      'Climate Action',
      'Life Below Water',
      'Life on Land',
      'Peace, Justice and Strong Institutions',
      'Partnerships for the Goals',
    ];
    if (this.goals === 'all') {
      _imgsrc = new URL(
        `../lib/svgs/${this.goals}.svg`,
        import.meta.url
      ).href;
      this.label =
        this.goals === 'all'
          ? 'All Sustainable Development Goals'
          : 'Sustainable Development Goals Circle';
    
    } 
    else if(this.goals ==='circle'){
      _imgsrc = new URL(
        `../lib/svgs/circle.png`,
        import.meta.url
      ).href;
      this.label =
        this.goals === 'circle'
          ? 'All Sustainable Development goalss'
          : 'Sustainable Development goalss Circle';
    
    }
    else {// This is for goals 1-17
      const goalNumber = parseInt(this.goals);
      if (goalNumber >= 1 && goalNumber <= 17) {
        _imgsrc = new URL(
          `../lib/svgs/goal${this.goals}.svg`,
          import.meta.url
        ).href;
        this.label = `Goal ${goalNumber}: ${goalData[goalNumber - 1]}`;
      }
    }
      
  }

  render() {//This activates only if the colorOnly is set as true causing the color box to appear 
    
    let _imgsrc = new URL(`../lib/svgs/goal${this.goals}.svg`,import.meta.url).href;
    if (this.goals === 'circle') {
       _imgsrc= new URL(`../lib/svgs/${this.goals}.png`,import.meta.url).href;
      
    }
    else if(this.goals === 'all'){
      _imgsrc = new URL(`../lib/svgs/${this.goals}.svg`,import.meta.url).href;
    }
    
//This renders the page-allows the images to appear and allows for alt text loading is set as lazy and fetch priority as low 
    if (this.colorOnly) {
      return html`
      <div class="color-only" style="background-color: var(--sg-goals-${this.goals});"></div>
      `;
    }
    else{
    return html`
    <img
      src="${_imgsrc}"
      alt="${this.label}"
      loading="${this.loading}"
      fetchpriority="${this.fetchpriority}"
    />`;
    }
  }

  //haxProperties integration via file reference
  static get haxProperties() {
    return new URL(`../lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(sustainableGoals.tag, sustainableGoals);

