import Roletype from './../role/Roletype';

let string = {
	get(ay: Roletype, attributeName: string, fallback?: string){
		return ay._.attributes[attributeName] || ay.element.getAttribute(attributeName) || fallback || null;
	},
	set(ay: Roletype, attributeName: string, value: string | null) {
		if (value == undefined) {
			ay.element.removeAttribute(attributeName);
		} else {
			ay.element.setAttribute(attributeName, value);
		}

		ay._.attributes[attributeName] = value;
	}
}

let boolean = {
	/**
	 * Returns the value of given attribute as Boolean
	 * @param {Roletype} ay 
	 * @param {string} attributeName 
	 * @return {?boolean} attribute's value
	 */
	get(ay: Roletype, attributeName: string, fallback?: boolean) {
		var value = ay._.attributes[attributeName] || ay.element.getAttribute(attributeName);
		if (value == undefined || (value !== 'true' && value !== 'false')) return fallback || null;
		return value === 'true';
	},

	/**
	 * Sync the new value to the property
	 * @param {AccessibleNode} ay 
	 * @param {string} attributeName 
	 * @param {?Boolean} status
	 */
	set(ay: Roletype, attributeName: string, status: boolean | null) {
		if (status == undefined) {
			ay.element.removeAttribute(attributeName);
		} else {
			ay.element.setAttribute(attributeName, status.toString());
		}

		ay._.attributes[attributeName] = status;
	}
};

let number = {
	/**
	 * Returns the value of a given attribute as Number
	 * @param {AccessibleNode} ay 
	 * @param {String} attributeName 
	 * @return {Number} attribute's value
	 */
	get(ay: Roletype, attributeName: string) {
		var value = ay._.attributes[attributeName] || ay.element.getAttribute(attributeName);
		if (value == undefined) return null;
		return Number(value);
	},

	/**
	 * Sync the new value to the DOM
	 * @param {AccessibleNode} ay 
	 * @param {String} attributeName 
	 * @param {String | Number } status 
	 */
	set(ay: Roletype, attributeName: string, value: null | number) {
		if(value == undefined) {
			ay.element.removeAttribute(attributeName);
		} else {
			ay.element.setAttribute(attributeName, value.toString());
		}

		ay._.attributes[attributeName] = value;
		return value;
	}
}

class RoletypeList extends Set {
	
	constructor(public _self: Roletype, public _attributeName: string){
		super();

		this._self = _self;
		this._attributeName = _attributeName;

		const linkedRoletypes = (_self.element.getAttribute(_attributeName) || "")
			.split(" ")
			.filter(id => !!id && !!document.getElementById(id))
			.map(id => {
				if(id === _self.element.id) {
					return _self;
				}

				return new Roletype(document.getElementById(id))
			});

		linkedRoletypes.forEach(roletype => this.add(roletype));
	}

	add(item){
		if(!(item instanceof Roletype)){
			throw new Error("Only instances of Roletype are allowed to be added.");
		}

		// Only add id when it's a new item
		if(!this.has(item)){
			const idRefs = this._self.element.getAttribute(this._attributeName) || "";
			this._self.element.setAttribute(this._attributeName, `${idRefs} ${item._id}`);
		}

		return super.add(item);
	}

	delete(item){
		const successfulRemoval = super.delete(item);

		// Remove ID from attribute
		if(successfulRemoval){
			const oldIdRefs = (this._self.element.getAttribute(this._attributeName) || "").split(" ");
			const idRefs = oldIdRefs.filter(id => id !== item._id);
			this._self.element.setAttribute(this._attributeName, idRefs.join(" "));
		}

		return successfulRemoval;
	}

	clear(){
		// Remove all IDs from attribute
		this._self.element.removeAttribute(this._attributeName);

		return super.clear();
	}
}

let RoletypeListSetup = {
	get() {},

	set(ay: Roletype, attributeName: string, value: null | RoletypeList) {
		if(value != undefined && !(value instanceof RoletypeList)){
			throw new Error(`Attribute '${attributeName}' only allows a instance of RoletypeList or a empty value.`);
		}
		
		let newIds = [];

		if(value instanceof RoletypeList){
			value.forEach((roletype => {
				newIds.push(roletype._id);
			}));
		}

		ay.element.setAttribute(attributeName, newIds.join(" "));

		ay._.attributes[attributeName] = value;
	}
};

let roletype = {
	get(ay: Roletype, attributeName: string, fallback?: string) {
		return ay._.attributes[attributeName] || fallback || null;
	},
	set(ay: Roletype, attributeName: string, roletype: null | Roletype) {
		if (roletype != undefined && !(roletype instanceof Roletype)) {
			throw new Error(`Attribute '${attributeName}' only allows a instance of Roletype or a empty roletype.`);
		}

		if (roletype == undefined) {
			ay.element.removeAttribute(attributeName);
		} else {
			ay.element.setAttribute(attributeName, roletype._id);
		}

		ay._.attributes[attributeName] = roletype;
	}
}

export {
	string,
	boolean,
	number,
	RoletypeListSetup,
	RoletypeList,
	roletype
};