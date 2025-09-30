addLayer("incrementy_i", {
    name: "incrementy_i", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
		points: new Decimal(0),
        unlocked: true
    }},
    color: "#4B4C83",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [],
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(1);},
		
		doReset(l){
			if(!l.startsWith("incrementy_")){return;}
			if(l=="incrementy_i" || l=="incrementy_b" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_i",["upgrades","milestones","challenges"]);
			return;
		},
		
	tooltip(){
		return format(player.modpoints[5])+" incrementy";
	},
	 upgrades: {
            rows: 4,
            cols: 5,
			11: {
				title: "Incrementy Upgrade 11",
                description(){
					return "Gain "+format(upgradeEffect("incrementy_i",11))+" Incrementy per second.";
				},
                cost: new Decimal(0),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
                    let ret = new Decimal(1);
					if(hasUpgrade("incrementy_i",12))ret=ret.mul(upgradeEffect("incrementy_i",12));
					if(hasUpgrade("incrementy_i",14)&&hasUpgrade("incrementy_am",21))ret=ret.mul(upgradeEffect("incrementy_i",14));
					if(hasUpgrade("incrementy_am",13))ret=ret.mul(upgradeEffect("incrementy_am",13));
					if(hasUpgrade("incrementy_am",14))ret=ret.mul(upgradeEffect("incrementy_am",14));
					if(hasUpgrade("incrementy_i",35))ret=ret.mul(upgradeEffect("incrementy_i",35));
					if(hasUpgrade("incrementy_i",33))ret=ret.mul(layers.incrementy_am.effect());
					if(hasUpgrade("incrementy_am",22))ret=ret.mul(upgradeEffect("incrementy_am",22));
					if(hasUpgrade("tptc_p",24))ret=ret.mul(upgradeEffect("tptc_p",24));
					if(hasUpgrade("incrementy_m",11))ret=ret.mul(upgradeEffect("incrementy_m",11));
					if(hasUpgrade("incrementy_a",21))ret=ret.mul(upgradeEffect("incrementy_a",21));
					if(hasUpgrade("incrementy_a",22))ret=ret.mul(upgradeEffect("incrementy_a",22));
					if(hasUpgrade("incrementy_a",23))ret=ret.mul(upgradeEffect("incrementy_a",23));
					if(hasUpgrade("incrementy_a",11)&&hasUpgrade("incrementy_a",24))ret=ret.mul(upgradeEffect("incrementy_a",11));
					if(hasUpgrade("incrementy_n",14))ret=ret.mul(buyableEffect("incrementy_n",13));
					if(hasUpgrade("incrementy_g",21))ret=ret.mul(upgradeEffect("incrementy_g",21));
					if(hasUpgrade("incrementy_s",32))ret=ret.mul(layers.incrementy_s.effect());
					if(hasUpgrade("incrementy_i",21)&&hasUpgrade("incrementy_b",22))ret=ret.mul(buyableEffect("incrementy_i",12));
					if(hasUpgrade("incrementy_sp",42))ret=ret.mul(layers.incrementy_a.effect()[0]);
					if(player.tm.buyables[5].gte(21)&&hasUpgrade("incrementy_pi",24))ret=ret.mul(player.incrementy_a.points.add(1).pow(layers.incrementy_b.effect().div(9)));
					
					if(hasUpgrade("incrementy_i",22))ret=ret.pow(buyableEffect("incrementy_i",13));
					
					if(hasUpgrade("incrementy_i",14)&&!hasUpgrade("incrementy_am",21))ret=ret.mul(upgradeEffect("incrementy_i",14));
					if(hasUpgrade("incrementy_i",15))ret=ret.mul(buyableEffect("incrementy_i",11));
					if(hasUpgrade("incrementy_i",21)&&!hasUpgrade("incrementy_b",22))ret=ret.mul(buyableEffect("incrementy_i",12));
					if(!hasUpgrade("incrementy_i",33))ret=ret.mul(layers.incrementy_am.effect());
					if(hasUpgrade("incrementy_am",11))ret=ret.mul(upgradeEffect("incrementy_am",11));
					if(!hasUpgrade("incrementy_sp",42))ret=ret.mul(layers.incrementy_a.effect()[0]);
					if(hasUpgrade("incrementy_a",11)&&!hasUpgrade("incrementy_a",24))ret=ret.mul(upgradeEffect("incrementy_a",11));
					ret=ret.mul(layers.incrementy_m.effect()[0]);
					if(hasUpgrade("incrementy_e",14))ret=ret.mul(upgradeEffect("incrementy_e",14));
					if(hasUpgrade("incrementy_n",22))ret=ret.mul(buyableEffect("incrementy_n",21));
					if(hasUpgrade("incrementy_g",24))ret=ret.mul(upgradeEffect("incrementy_g",24));
					if(!hasUpgrade("incrementy_s",32))ret=ret.mul(layers.incrementy_s.effect());
					if(player.tm.buyables[5].gte(21)&&!hasUpgrade("incrementy_pi",24))ret=ret.mul(player.incrementy_a.points.add(1).pow(layers.incrementy_b.effect()));
					
					ret=ret.pow(buyableEffect("incrementy_o",11));
					
					if(inChallenge("incrementy_am",11))ret=ret.pow(0.1);
					if(inChallenge("incrementy_m",11))ret=ret.root(2);
					if(inChallenge("incrementy_m",12))ret=ret.root(3);
					if(inChallenge("incrementy_q",11))ret=ret.root(2);
					if(inChallenge("incrementy_q",12))ret=ret.root(3);
					if(inChallenge("incrementy_q",21))ret=ret.root(5);
					if(inChallenge("incrementy_q",22))ret=ret.root(4);
					if(inChallenge("incrementy_sp", 22))ret=ret.root(100);
                    return ret;
				},
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			12: {
				title: "Incrementy Upgrade 12",
                description: "Boost your base incrementy gain based on your points.",
                cost: new Decimal(10),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
                    let base=1.01;
					if(hasUpgrade("incrementy_pi",13))base=1.1;
                    let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(0.5));
					if(hasUpgrade("incrementy_am",12))ret=ret.pow(2);
					if(hasUpgrade("incrementy_m",12))ret=ret.pow(2);
					if(hasUpgrade("incrementy_p",15))ret=ret.pow(2);
					if(hasUpgrade("incrementy_g",22))ret=ret.pow(upgradeEffect("incrementy_g",22));
					if(hasUpgrade("incrementy_i",41))ret=ret.pow(2);
                    return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			13: {
				title: "Incrementy Upgrade 13",
                description: "Boost your point gain based on your incrementy.",
                cost: new Decimal(100),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
                    let base=1e10;
                    let ret = Decimal.pow(base,Decimal.log10(player.modpoints[5].add(1)).pow(0.9));
					if(player.incrementy_sp.best.gte(13))ret = Decimal.pow(base,Decimal.log10(player.modpoints[5].add(1)).pow(0.93));
					if(hasUpgrade("milestone_p",33))ret = player.modpoints[5].add(1).pow(1.6);
					if(hasUpgrade("milestone_p",34))ret = player.modpoints[5].add(1).pow(1.8);
					if(hasUpgrade("milestone_p",35))ret = player.modpoints[5].add(1).pow(2);
                    return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			14: {
				title: "Incrementy Upgrade 14",
                description(){
					if(hasUpgrade("incrementy_am",21))return "Boost your base Incrementy gain based on your Incrementy upgrades.";
					return "Boost your Incrementy gain based on your Incrementy upgrades.";
				},
                cost: new Decimal(300),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
                    let ret=Decimal.pow(1.2,player.incrementy_i.upgrades.length);
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			15: {
				title: "Incrementy Upgrade 15",
                description: "Unlock an Incrementy buyable.",
                cost: new Decimal(500),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			21: {
				title: "Incrementy Upgrade 21",
                description: "Unlock an Incrementy buyable, and the first Incrementy buyable's effect base +0.1.",
                cost: new Decimal(4e4),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			22: {
				title: "Incrementy Upgrade 22",
                description: "Unlock an Incrementy buyable, and the effect base of first 2 Incrementy buyables +0.1.",
                cost: new Decimal(1e8),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			23: {
				title: "Incrementy Upgrade 23",
                description: "Remove the linear cost scaling of Incrementy Speed",
                cost: new Decimal(1e11),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			24: {
				title: "Incrementy Upgrade 24",
                description: "Remove the linear cost scaling of Incrementy Strength",
                cost: new Decimal(1e25),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			25: {
				title: "Incrementy Upgrade 25",
                description: "Remove the linear cost scaling of Incrementy Stamina",
                cost: new Decimal(5e27),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			31: {
				title: "Incrementy Upgrade 31",
                description(){
					if(hasUpgrade("incrementy_m",33))return "Each bought Incrementy Strength adds 1 to the Incrementy Strength base";
					if(hasUpgrade("incrementy_b",13))return "Each bought Incrementy Strength adds .02 to the Incrementy Strength base";
					return "Each bought Incrementy Strength adds .02 to the Incrementy Strength base (capped at 10)";
				},
                cost: new Decimal(1e60),
                unlocked() { return player.tm.buyables[5].gte(2); }, // The upgrade is only visible when this is true
				effect() {
					if(hasUpgrade("incrementy_m",33))return player.incrementy_i.buyables[12];
                    let ret = Decimal.mul(player.incrementy_i.buyables[12],0.02);
					if(!hasUpgrade("incrementy_b",13))ret=ret.min(10);
                    return ret;
				},
                effectDisplay() { return "+"+format(this.effect()) }, // Add formatting to the effect
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			32: {
				title: "Incrementy Upgrade 32",
                description(){
					if(hasUpgrade("incrementy_m",32))return "Each bought Incrementy Speed adds 1 to the Incrementy Speed base";
					if(hasUpgrade("incrementy_a",25))return "Each bought Incrementy Speed adds .01 to the Incrementy Speed base";
					return "Each bought Incrementy Speed adds .01 to the Incrementy Speed base (capped at 10)";
				},
                cost: new Decimal(1e79),
                unlocked() { return player.tm.buyables[5].gte(2); }, // The upgrade is only visible when this is true
				effect() {
					if(hasUpgrade("incrementy_m",32))return player.incrementy_i.buyables[11];
                    let ret = Decimal.mul(player.incrementy_i.buyables[11],0.01);
					if(!hasUpgrade("incrementy_a",25))ret=ret.min(10);
                    return ret;
				},
                effectDisplay() { return "+"+format(this.effect()) }, // Add formatting to the effect
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			33: {
				title: "Incrementy Upgrade 33",
                description: "Antimatter effect is applied before Incrementy Stamina",
                cost: new Decimal(1e260),
                unlocked() { return player.tm.buyables[5].gte(2); }, // The upgrade is only visible when this is true
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			34: {
				title: "Incrementy Upgrade 34",
                description: "Remove the quadratic cost scaling of Incrementy Stamina",
                cost: new Decimal("1e560"),
                unlocked() { return player.tm.buyables[5].gte(2); }, // The upgrade is only visible when this is true
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			35: {
				title: "Incrementy Upgrade 35",
                description: "Multiply your base incrementy gain based on your Incrementy Stamina levels.",
                cost: new Decimal("1e590"),
                unlocked() { return player.tm.buyables[5].gte(2); }, // The upgrade is only visible when this is true
				effect() {
                    let ret=player.incrementy_i.buyables[13].add(1);
					if(hasUpgrade("incrementy_m",14))ret=ret.pow(5);
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			41: {
				title: "Incrementy Upgrade 41",
                description: "Square Incrementy Upgrade 12.",
                cost: new Decimal("e1e5"),
                unlocked() { return player.incrementy_q.challenges[11]; }, // The upgrade is only visible when this is true
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			42: {
				title: "Incrementy Upgrade 42",
                description: "Neutrino Generation levels add to Incrementy Speed levels.",
                cost: new Decimal("e1.196e5"),
                unlocked() { return player.incrementy_q.challenges[11]; }, // The upgrade is only visible when this is true
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			43: {
				title: "Incrementy Upgrade 43",
                description: "Incrementy Boost Gluon gain.",
                cost: new Decimal("e1.22e5"),
                unlocked() { return player.incrementy_q.challenges[11]; }, // The upgrade is only visible when this is true
				effect() {
                    let ret=player.modpoints[5].add(10).log10().pow(player.modpoints[5].add(10).log10().add(10).log10());
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			44: {
				title: "Incrementy Upgrade 44",
                description: "Incrementy Boost Neutrino gain.",
                cost: new Decimal("e1.38e5"),
                unlocked() { return player.incrementy_q.challenges[11]; }, // The upgrade is only visible when this is true
				effect() {
                    let ret=player.modpoints[5].add(10).log10().pow(player.modpoints[5].add(10).log10().add(10).log10().mul(2));
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
			45: {
				title: "Incrementy Upgrade 45",
                description(){
					if(hasUpgrade("incrementy_e", 34))return "Matter gain softcap starts later.";
					return "Matter gain exponent is multiplied by 2.";
				},
                cost: new Decimal("e1.43e5"),
                unlocked() { return player.incrementy_q.challenges[11]; }, // The upgrade is only visible when this is true
				currencyLayer: "modpoints",
				currencyInternalName: "5",
				currencyDisplayName: "incrementy",
			},
	 },
	 buyables:{
		 rows: 1,
		 cols: 3,
		 11: {
                title: "Incrementy Speed",
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(2, x).mul(Decimal.pow(1.01, x.pow(2))).mul(10);
					if(hasUpgrade("incrementy_i",23))cost = Decimal.pow(1.01, x.pow(2)).mul(10);
					if(hasUpgrade("incrementy_a",12))cost = Decimal.pow(1.01, x.pow(2));
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Amount: "+formatWhole(player.incrementy_i.buyables[11])+(data.free.gt(0)?("+"+formatWhole(data.free)):"")+"<br>"+
					"Cost: "+format(data.cost)+" Incrementy<br>"+
					"Effect: "+(hasUpgrade("incrementy_a",24)?"Base ":"")+"Incrementy gain x"+format(data.effect);
                },
                unlocked() { return player[this.layer].unlocked }, 
                canAfford() {
					return player.modpoints[5].gte(tmp[this.layer].buyables[this.id].cost);
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player.modpoints[5] = player.modpoints[5].sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
				effect(){
					let base=new Decimal(1.5);
					if(hasUpgrade("incrementy_i",21))base=base.add(0.1);
					if(hasUpgrade("incrementy_i",22))base=base.add(0.1);
					if(hasUpgrade("incrementy_i",32))base=base.add(upgradeEffect("incrementy_i",32));
					return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
				},
				unlocked(){ return hasUpgrade("incrementy_i",15)},
				free(){
					let ret=new Decimal(0);
					if(hasUpgrade("incrementy_i",42))ret=ret.add(player.incrementy_n.buyables[11]);
					if(hasUpgrade("incrementy_i",42))ret=ret.add(layers.incrementy_n.buyables[11].free());
					if(hasUpgrade("incrementy_b",15))ret=ret.add(player.incrementy_i.buyables[13].mul(layers.incrementy_b.challenges[12].rewardEffect()));
					if(hasUpgrade("incrementy_m",34))ret=ret.add(player.incrementy_i.buyables[12]);
					return ret;
				},
        },
		 12: {
                title: "Incrementy Strength",
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(4, x).mul(Decimal.pow(1.25, x.pow(2))).mul(1e4);
					if(hasUpgrade("incrementy_i",24))cost = Decimal.pow(1.25, x.pow(2)).mul(1e4);
					if(hasUpgrade("incrementy_a",13))cost = Decimal.pow(1.25, x.pow(2));
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Amount: "+formatWhole(player.incrementy_i.buyables[12])+"<br>"+
					"Cost: "+format(data.cost)+" Incrementy<br>"+
					"Effect: "+(hasUpgrade("incrementy_b",22)?"Base ":"")+"Incrementy gain x"+format(data.effect);
                },
                unlocked() { return player[this.layer].unlocked }, 
                canAfford() {
					return player.modpoints[5].gte(tmp[this.layer].buyables[this.id].cost);
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player.modpoints[5] = player.modpoints[5].sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
				effect(){
					let base=new Decimal(2);
					if(hasUpgrade("incrementy_i",22))base=base.add(0.1);
					if(hasUpgrade("incrementy_i",31))base=base.add(upgradeEffect("incrementy_i",31));
					base = base.plus(layers.incrementy_b.challenges[11].rewardEffect())
					return Decimal.pow(base,player[this.layer].buyables[this.id]);
				},
				unlocked(){ return hasUpgrade("incrementy_i",21)},
        },
		 13: {
                title: "Incrementy Stamina",
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(2, x).mul(Decimal.pow(1.25, x.pow(2))).mul(Decimal.pow(1.1, Decimal.pow(1.2, x))).mul(1e6);
					if(hasUpgrade("incrementy_i",25))cost = Decimal.pow(1.25, x.pow(2)).mul(Decimal.pow(1.1, Decimal.pow(1.2, x))).mul(1e6);
					if(hasUpgrade("incrementy_i",34))cost = Decimal.pow(1.1, Decimal.pow(1.2, x)).mul(1e6);
					if(hasUpgrade("incrementy_sp",54))cost = Decimal.pow(1.1, Decimal.pow(1.19, x));
					if(hasUpgrade("incrementy_pi",31))cost = Decimal.pow(1.1, Decimal.pow(1.185, x));
					if(hasUpgrade("incrementy_pi",41))cost = Decimal.pow(1.1, Decimal.pow(1.18, x));
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Amount: "+formatWhole(player.incrementy_i.buyables[13])+(data.free.gt(0)?("+"+formatWhole(data.free)):"")+"<br>"+
					"Cost: "+format(data.cost)+" Incrementy<br>"+
					"Effect: Base incrementy gain ^"+format(data.effect)+(player.incrementy_i.buyables[13].add(data.free).gte(data.softcap)?" (softcapped)<br>Softcap starts at "+formatWhole(data.softcap):"");
                },
                unlocked() { return player[this.layer].unlocked }, 
                canAfford() {
					return player.modpoints[5].gte(tmp[this.layer].buyables[this.id].cost);
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player.modpoints[5] = player.modpoints[5].sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
				effect(){
                    if (inChallenge("incrementy_b", 11)) return player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()).div(hasMilestone("incrementy_o",5)?10:20).plus(1)
					let base=new Decimal(1.04);
					let power=player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free());
					let softcap=layers[this.layer].buyables[this.id].softcap();
					if(power.gte(softcap))power=power.div(softcap).sqrt().mul(softcap);
					return Decimal.pow(base,power);
				},
				softcap(){
					if(inChallenge("incrementy_sp", 21))return new Decimal(1);
					let ret=new Decimal(40).add(layers.incrementy_sp.effect()).add(layers.incrementy_pi.effect());
					if(player.incrementy_am.challenges[11])ret=ret.add(5);
					if(player.incrementy_m.challenges[11])ret=ret.add(5);
					if(hasUpgrade("incrementy_e",22))ret=ret.add(1);
					if(hasUpgrade("incrementy_e",24))ret=ret.add(1);
					if(hasUpgrade("incrementy_am",32))ret=ret.add(3);
					if(hasUpgrade("incrementy_s",24))ret=ret.add(5);
					if(hasUpgrade("incrementy_s",34))ret=ret.add(1);
					if(hasUpgrade("incrementy_b",21))ret=ret.add(2);
					if(hasUpgrade("incrementy_b",25))ret=ret.add(2);
					if(hasUpgrade("incrementy_b",35))ret=ret.add(5);
					if(hasUpgrade("incrementy_a",33))ret=ret.add(5);
					if(hasUpgrade("incrementy_sp",34))ret=ret.add((player.incrementy_sp.upgrades||[]).length/10);
					return ret;
				},
				unlocked(){ return hasUpgrade("incrementy_i",22)},
				free(){
					let ret=new Decimal(0);
					if(hasUpgrade("incrementy_o",13))ret=ret.add(1);
					if(hasUpgrade("incrementy_o",22))ret=ret.add((player.incrementy_o.upgrades||[]).length);
					return ret;
				},
        },
	 },
	 tabFormat: ["upgrades","buyables"],
		update(diff){
			if(hasUpgrade("incrementy_i",11))player.modpoints[5]=player.modpoints[5].add(upgradeEffect("incrementy_i",11).mul(diff));
			
					if(hasUpgrade("incrementy_a",12)){
						var target=player.modpoints[5].add(1).log(1.01).pow(1/2).add(1).floor();
						if(target.gt(player.incrementy_i.buyables[11])){
							player.incrementy_i.buyables[11]=target;
						}
					}
					if(hasUpgrade("incrementy_a",13)){
						var target=player.modpoints[5].add(1).log(1.25).pow(1/2).add(1).floor();
						if(target.gt(player.incrementy_i.buyables[12])){
							player.incrementy_i.buyables[12]=target;
						}
					}
					if(hasUpgrade("incrementy_m",13)){
						var target=player.modpoints[5].div(1e6).add(1).log(1.1).add(1).log(1.2).add(1).floor();
						if(hasUpgrade("incrementy_sp",54))target=player.modpoints[5].add(1).log(1.1).add(1).log(1.19).add(1).floor();
						if(hasUpgrade("incrementy_pi",31))target=player.modpoints[5].add(1).log(1.1).add(1).log(1.185).add(1).floor();
						if(hasUpgrade("incrementy_pi",41))target=player.modpoints[5].add(1).log(1.1).add(1).log(1.18).add(1).floor();
						if(target.gt(player.incrementy_i.buyables[13])){
							player.incrementy_i.buyables[13]=target;
						}
					}
		},
});


addLayer("incrementy_am", {
    name: "incrementy_am", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#DB4C83",
    requires(){
		if(player.incrementy_sp.best.gte(2))return new Decimal(1);
		return new Decimal(110);
	},
    resource: "antimatter", // Name of prestige currency
    baseResource: "total bought incrementy buyable levels", // Name of resource prestige is based on
    baseAmount() {return player.incrementy_i.buyables[11].add(player.incrementy_i.buyables[12]).add(player.incrementy_i.buyables[13])}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(15)
		if(hasUpgrade("incrementy_b",24))mult = new Decimal(1);
		mult=mult.mul(layers.incrementy_a.effect()[1]);
		mult=mult.mul(layers.incrementy_m.effect()[1]);
		if(hasUpgrade("incrementy_n",25))mult = mult.mul(buyableEffect("incrementy_n",32));
		if(hasUpgrade("incrementy_am",31))mult = mult.mul(upgradeEffect("incrementy_am",31));
          mult=mult.mul(player.incrementy_e.points.max(1).pow(layers.incrementy_sp.challenges[21].rewardEffect().sub(1)))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ["incrementy_i"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(2) && (!player.incrementy_pi.hidelayers)},
		doReset(l){
			if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_am",["upgrades","milestones","challenges"]);
			return;
		},
        effect(){
			if (inChallenge("incrementy_m", 12)) return new Decimal(1)
                let ret = player.incrementy_am.points.plus(1).pow(1.5);
			if(hasMilestone("incrementy_o",1))ret = player.incrementy_am.points.plus(1);
                return ret
        },
        effectDescription(){
			if(hasUpgrade("incrementy_i",33))return "which multiplies base incrementy gain by " + format(layers.incrementy_am.effect())
                return "which multiplies incrementy gain by " + format(layers.incrementy_am.effect())
        },
	getResetGain() {
		let ret=player.incrementy_i.buyables[11].add(player.incrementy_i.buyables[12]).add(player.incrementy_i.buyables[13]);
		if(ret.lt(110) && !(player.incrementy_sp.best.gte(2)))return new Decimal(0);
		if(hasUpgrade("incrementy_e",35))return Decimal.pow(10,ret).mul(layers.incrementy_am.gainMult()).floor();
		if(hasUpgrade("incrementy_sp",45))return Decimal.pow(3,ret).mul(layers.incrementy_am.gainMult()).floor();
		if(hasUpgrade("incrementy_sp",25))return Decimal.pow(2,ret).mul(layers.incrementy_am.gainMult()).floor();
		if(hasUpgrade("incrementy_sp",21))return Decimal.pow(1.5,ret).mul(layers.incrementy_am.gainMult()).floor();
		if(hasUpgrade("incrementy_s",43))return Decimal.pow(1.25,ret).mul(layers.incrementy_am.gainMult()).floor();
		if(hasUpgrade("incrementy_b",24))return Decimal.pow(1.181,ret).mul(layers.incrementy_am.gainMult()).floor();
		return Decimal.pow(1.1,ret.sub(110)).mul(layers.incrementy_am.gainMult()).floor();
	},
	getNextAt() {
		let ret=player.incrementy_i.buyables[11].add(player.incrementy_i.buyables[12]).add(player.incrementy_i.buyables[13]).add(1).max(110);
		return ret;
	},
	 upgrades: {
            rows: 3,
            cols: 5,
			11: {
				title: "Antimatter Upgrade 11",
                description: "Incrementy boosts Incrementy gain.",
                cost: new Decimal(2),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
                    let base=1.5;
                    let ret = Decimal.pow(base,Decimal.log10(player.modpoints[5].add(1)).pow(0.9));
					if(hasUpgrade("incrementy_am",21))ret=ret.pow(1.5);
                    return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			12: {
				title: "Antimatter Upgrade 12",
                description: "Incrementy Upgrade 12 is squared.",
                cost: new Decimal(200),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			13: {
				title: "Antimatter Upgrade 13",
                description: "Multiply your base incrementy gain based on your Incrementy Speed levels.",
                cost: new Decimal(1000),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
                    let ret=player.incrementy_i.buyables[11].add(1);
					if(hasUpgrade("incrementy_am",24))ret=ret.pow(2);
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			14: {
				title: "Antimatter Upgrade 14",
                description: "Multiply your base incrementy gain based on your Incrementy Strength levels.",
                cost: new Decimal(20000),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
                    return player.incrementy_i.buyables[12].add(1);
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			15: {
				title: "Antimatter Upgrade 15",
                description(){return "Gain "+(player.incrementy_sp.best.gte(2)?"1e6":100)+"% of antimatter gain per second.";},
                cost: new Decimal(1e10),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			21: {
				title: "Antimatter Upgrade 21",
                description: "Antimatter Upgrade 11's effect ^1.5, and Incrementy Upgrade 14 boost base incrementy gain instead.",
                cost: new Decimal(1e40),
                unlocked() { return player.tm.buyables[5].gte(4); }, // The upgrade is only visible when this is true
			},
			22: {
				title: "Antimatter Upgrade 22",
                description: "Each Antimatter Upgrade multiplies base incrementy gain by 10.",
                cost: new Decimal(1e43),
                unlocked() { return player.tm.buyables[5].gte(4); }, // The upgrade is only visible when this is true
				effect() {
                    let ret=Decimal.pow(10,player.incrementy_am.upgrades.length);
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			23: {
				title: "Antimatter Upgrade 23",
                description: "Unlock an antimatter challenge.",
                cost: new Decimal(1e46),
                unlocked() { return player.tm.buyables[5].gte(4); }, // The upgrade is only visible when this is true
			},
			24: {
				title: "Antimatter Upgrade 24",
                description: "Antimatter Upgrade 13 is squared.",
                cost: new Decimal(1e50),
                unlocked() { return player.tm.buyables[5].gte(5); }, // The upgrade is only visible when this is true
			},
			25: {
				title: "Antimatter Upgrade 25",
                description: "Unlock an antimatter challenge.",
                cost: new Decimal(1e55),
                unlocked() { return player.tm.buyables[5].gte(5); }, // The upgrade is only visible when this is true
			},
			31: {
				title: "Antimatter Upgrade 31",
                description: "Antimatter gain is boosted by Quark Challenge completions.",
                cost: new Decimal("1e1550"),
				effect(){
                                let c = 0
                                if (hasChallenge("incrementy_q", 11)) c ++
                                if (hasChallenge("incrementy_q", 12)) c ++
                                if (hasChallenge("incrementy_q", 21)) c ++
                                if (hasChallenge("incrementy_q", 22)) c ++
                                return Decimal.pow(1+c, 300)
                        },
                unlocked() { return hasChallenge("incrementy_q", 21); }, // The upgrade is only visible when this is true
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			32: {
				title: "Antimatter Upgrade 32",
                description: "Incrementy Stamina softcap starts 3 later <br>(52 -> 55)",
                cost: new Decimal("1e1770"),
                unlocked() { return hasChallenge("incrementy_q", 21); }, // The upgrade is only visible when this is true
			},
			33: {
				title: "Antimatter Upgrade 33",
                description: "Particle gain formula is better.",
                cost: new Decimal("1e1815"),
                unlocked() { return hasChallenge("incrementy_q", 21); }, // The upgrade is only visible when this is true
			},
			34: {
				title: "Antimatter Upgrade 34",
                description: "Unlock a quark challenge.",
                cost: new Decimal("1e1900"),
                unlocked() { return hasChallenge("incrementy_q", 21); }, // The upgrade is only visible when this is true
			},
			35: {
				title: "Antimatter Upgrade 35",
                description: "Amoeba gain formula is better.",
                cost: new Decimal("1e2000"),
                unlocked() { return hasChallenge("incrementy_q", 21); }, // The upgrade is only visible when this is true
			},
	 },
	passiveGeneration(){
		if(hasUpgrade("incrementy_am",15)&&player.incrementy_sp.best.gte(2))return 1e4;
		if(hasUpgrade("incrementy_am",15))return 1;
		return 0;
	},
	
        challenges:{
                rows: 1,
                cols: 2,
                11: {
                        name: "Know?", 
                        challengeDescription: "Get ^.1 of your normal Incrementy gain",
                        rewardDescription: "Incrementy Stamina softcap starts 5 later (40 -> 45)",
                        unlocked(){
                                return hasUpgrade("incrementy_am",23);
                        },
                        goal: new Decimal(1e68),
                        currencyLayer: "modpoints",
                        currencyInternalName: "5",
		                currencyDisplayName: "incrementy",
                },
                12: {
                        name: "No!", 
                        challengeDescription: "Your points are reset, Get ^.1 of your normal point gain",
                        rewardDescription: "Unlock Matter and the ability to Matter Prestige",
                        unlocked(){
                                return hasUpgrade("incrementy_am",25);
                        },
                        goal: new Decimal("1e30000"),
                        currencyInternalName: "points",
						resetPoints: true,
                },
		},
});


addLayer("incrementy_a", {
    name: "incrementy_a", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#1B4C23",
    requires(){
		if(player.incrementy_sp.best.gte(2))return new Decimal(1);
		return new Decimal("1e600");
	},
    resource: "amoebas", // Name of prestige currency
    baseResource: "incrementy", // Name of resource prestige is based on
    baseAmount() {return player.modpoints[5]}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(hasUpgrade("incrementy_n",25))mult = mult.mul(buyableEffect("incrementy_n",33));
        mult = mult.mul(player.incrementy_q.points.max(10).log10().pow(layers.incrementy_b.challenges[21].rewardEffect()))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ["incrementy_am"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(3) && (!player.incrementy_pi.hidelayers)},
		doReset(l){
			if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_a",["upgrades","milestones","challenges"]);
			return;
		},
	getResetGain() {
		let ret=player.modpoints[5];
		if(player.incrementy_sp.best.gte(2))ret=ret.add(1).mul("1e600");
		if(ret.lt("1e600"))return new Decimal(0);
		ret=ret.log10().div(6).pow(hasUpgrade("incrementy_a",31)?0.56:hasUpgrade("incrementy_sp",33)?0.55:hasUpgrade("incrementy_am",35)?0.52:0.5).sub(10);
		ret=Decimal.pow(10,ret).mul(layers.incrementy_a.gainMult()).floor();
		return ret;
	},
	getNextAt() {
		let ret=tmp.incrementy_a.getResetGain.plus(1);
		ret=ret.div(layers.incrementy_a.gainMult()).max(1).log10();
		ret=ret.add(10).pow(hasUpgrade("incrementy_a",31)?(1/0.56):hasUpgrade("incrementy_sp",33)?(1/0.55):hasUpgrade("incrementy_am",35)?(1/0.52):2).mul(6);
		ret=Decimal.pow(10,ret);
		if(player.incrementy_sp.best.gte(2))ret=ret.div("1e600").sub(1);
		return ret;
	},
        effect(){
			if (inChallenge("incrementy_m", 11) || inChallenge("incrementy_m", 12)) return [new Decimal(1), new Decimal(1)]
                let eff1 = player.incrementy_a.points.add(1).pow(6)
				if(hasUpgrade("incrementy_a",32))return [eff1, eff1];
                let eff2 = player.incrementy_a.points.add(1).pow(hasUpgrade("incrementy_sp",44)?4:hasUpgrade("incrementy_sp",32)?3:2)
                return [eff1, eff2]
        },
        effectDescription(){
                let eff = layers.incrementy_a.effect()
				if(hasUpgrade("incrementy_a",32) && hasUpgrade("incrementy_sp",42))return "which multiplies base incrementy gain and antimatter gain by " + format(eff[0])
			if(hasUpgrade("incrementy_sp",42))return "which multiplies base incrementy gain by " + format(eff[0]) + " and antimatter gain by " + format(eff[1])
                return "which multiplies incrementy gain by " + format(eff[0]) + " and antimatter gain by " + format(eff[1])
        },
		
	 upgrades: {
            rows: 3,
            cols: 5,
			11: {
				title: "Amoeba Upgrade 11",
                description(){
					if(hasUpgrade("incrementy_a",24))return "Each Amoeba Upgrade multiplies base Incrementy gain by 1e10.";
					return "Each Amoeba Upgrade multiplies Incrementy gain by 1e10.";
				},
                cost: new Decimal(1),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
                    let ret=Decimal.pow(1e10,player.incrementy_a.upgrades.length);
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			12: {
				title: "Amoeba Upgrade 12",
                description: "Autobuy Incrementy Speed, and divide Incrementy Speed costs by 10.",
                cost: new Decimal(3),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			13: {
				title: "Amoeba Upgrade 13",
                description: "Autobuy Incrementy Strength, and divide Incrementy Strength costs by 1e4.",
                cost: new Decimal(5),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			14: {
				title: "Amoeba Upgrade 14",
                description: "Unlock a Prestige upgrade in The Prestige Tree Classic.",
                cost: new Decimal(100),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			15: {
				title: "Amoeba Upgrade 15",
                description(){return  "Gain "+(player.incrementy_sp.best.gte(2)?"1e6":100)+"% of amoeba gain per second."},
                cost: new Decimal(2000),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			21: {
				title: "Amoeba Upgrade 21",
                description: "Boost your base incrementy gain based on your amoebas.",
                cost: new Decimal(1e30),
                unlocked() { return player.tm.buyables[5].gte(7); }, // The upgrade is only visible when this is true
				effect() {
                    let ret=player.incrementy_a.points.add(10);
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			22: {
				title: "Amoeba Upgrade 22",
                description: "Boost your base incrementy gain based on your matter.",
                cost: new Decimal(1e31),
                unlocked() { return player.tm.buyables[5].gte(7); }, // The upgrade is only visible when this is true
				effect() {
                    let base=3;
                    let ret = Decimal.pow(base,Decimal.log10(player.incrementy_m.points.add(1)).pow(0.9));
                    return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			23: {
				title: "Amoeba Upgrade 23",
                description: "Boost your base incrementy gain based on your energy.",
                cost: new Decimal(1e32),
                unlocked() { return player.tm.buyables[5].gte(7); }, // The upgrade is only visible when this is true
				effect() {
                    let base=3;
                    let ret = Decimal.pow(base,Decimal.log10(player.incrementy_e.points.add(1)).pow(0.9));
                    return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			24: {
				title: "Amoeba Upgrade 24",
                description: "Amoeba Upgrade 11 boost base incrementy gain instead.",
                cost: new Decimal(1e34),
                unlocked() { return player.tm.buyables[5].gte(7); }, // The upgrade is only visible when this is true
			},
			25: {
				title: "Amoeba Upgrade 25",
                description: "Uncap Incrementy Upgrade 32.",
                cost: new Decimal(1e37),
                unlocked() { return player.tm.buyables[5].gte(7); }, // The upgrade is only visible when this is true
			},
			31: {
				title: "Amoeba Upgrade 31",
                description: "Amoeba gain is better.",
                cost: new Decimal("1e50000"),
                unlocked() { return hasUpgrade("incrementy_sp",52); }, // The upgrade is only visible when this is true
			},
			32: {
				title: "Amoeba Upgrade 32",
                description: "Amoeba effect to Antimatter is better.",
                cost: new Decimal("1e67300"),
                unlocked() { return hasUpgrade("incrementy_sp",52); }, // The upgrade is only visible when this is true
			},
			33: {
				title: "Amoeba Upgrade 33",
                description: "Incrementy Stamina softcap starts 5 later (70 -> 75)",
                cost: new Decimal("1e69600"),
                unlocked() { return hasUpgrade("incrementy_sp",52); }, // The upgrade is only visible when this is true
			},
			34: {
				title: "Amoeba Upgrade 34",
                description: "Unlock more Matter upgrades.",
                cost: new Decimal("1e74600"),
                unlocked() { return hasUpgrade("incrementy_sp",52); }, // The upgrade is only visible when this is true
			},
			35: {
				title: "Amoeba Upgrade 35",
                description: "Amoeba boost Super Prestige point gain.",
                cost: new Decimal("1e75000"),
                unlocked() { return hasUpgrade("incrementy_sp",52); }, // The upgrade is only visible when this is true
				effect() {
                    let ret = player.incrementy_a.points.add(100).log10().sqrt();
                    return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
	 },
	passiveGeneration(){
		if(hasUpgrade("incrementy_a",15)&&player.incrementy_sp.best.gte(2))return 1e4;
		if(hasUpgrade("incrementy_a",15))return 1;
		return 0;
	}
});


addLayer("incrementy_m", {
    name: "incrementy_m", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#3B1053",
    requires(){
		if(player.incrementy_sp.best.gte(2))return new Decimal(1);
		return new Decimal("1e2000");
	},
    resource: "matter", // Name of prestige currency
    baseResource: "incrementy", // Name of resource prestige is based on
    baseAmount() {return player.modpoints[5]}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent(){
		let ret=new Decimal(0.001);
		if(hasUpgrade("incrementy_i",45) && !hasUpgrade("incrementy_e",34))ret=ret.mul(2);
		return ret;
	}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(10)
		if(hasUpgrade("incrementy_e",12))mult=mult.mul(upgradeEffect("incrementy_e",12));
		if(hasUpgrade("incrementy_m",22))mult=mult.mul(upgradeEffect("incrementy_m",22));
		if(hasUpgrade("incrementy_m",24))mult=mult.mul(upgradeEffect("incrementy_m",24));
		if(hasUpgrade("incrementy_e",15))mult=mult.mul(upgradeEffect("incrementy_e",15));
		if(hasUpgrade("incrementy_e",21))mult=mult.mul(upgradeEffect("incrementy_e",21));
		if(hasUpgrade("incrementy_e",23))mult=mult.mul(upgradeEffect("incrementy_e",23));
		if(hasUpgrade("incrementy_n",25))mult = mult.mul(buyableEffect("incrementy_n",31));
		if(hasUpgrade("incrementy_p",35))mult = mult.mul(buyableEffect("incrementy_p",13));
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	getResetGain() {
		let ret = tmp[this.layer].baseAmount.div(tmp[this.layer].requires).pow(tmp[this.layer].exponent);
		if(!hasUpgrade("incrementy_e",32) && ret.gte("e15e5"))ret = Decimal.pow(10, ret.log10().div(15).log10().mul(3e5));
		else if(!hasUpgrade("incrementy_e",34) && ret.gte("e2e6"))ret = Decimal.pow(10, ret.log10().div(2).log10().div(6).mul(2e6));
		else if(!hasUpgrade("incrementy_pi",15) && ret.gte("e36e6"))ret = Decimal.pow(10, ret.log10().div(36).log10().mul(6e6));
		else if(!(hasMilestone("incrementy_o",0)) && ret.gte("e4e7"))ret = Decimal.pow(10, ret.log10().div(4).log10().div(7).mul(4e7));
		else if(!(hasMilestone("incrementy_o",2)) && ret.gte("e1e8"))ret = Decimal.pow(10, ret.log10().root(8).mul(1e7));
		else if(!(hasUpgrade("tm",63)) && ret.gte("e1e8"))ret = Decimal.pow(10, ret.log10().root(4).mul(1e6));
		else if(ret.gte("e125e6"))ret = Decimal.pow(10, ret.log10().root(3).mul(25e4));
		ret = ret.times(tmp[this.layer].gainMult);
		return ret;
	},
    branches: ["incrementy_i"],
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(3) && player.incrementy_am.challenges[12]>=1 && (!player.incrementy_pi.hidelayers);},
		doReset(l){
			if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_m",["upgrades","milestones","challenges"]);
			return;
		},
        effect(){
				if(hasMilestone("incrementy_o",0))return [new Decimal(1),new Decimal(1)];
                let eff1 = player.incrementy_m.points.add(1).pow(10)
                let eff2 = player.incrementy_m.points.mul(10).add(1).pow(0.5)
                return [eff1, eff2]
        },
        effectDescription(){
				if(hasMilestone("incrementy_o",0))return "";
                let eff = layers.incrementy_m.effect()
                return "which multiplies incrementy gain by " + format(eff[0]) + " and antimatter gain by " + format(eff[1])
        },
		
	 upgrades: {
            rows: 3,
            cols: 5,
			11: {
				title: "Matter Upgrade 11",
                description(){
					if(hasUpgrade("incrementy_m",21) && player.incrementy_m.challenges[12])return "Each Matter Upgrade multiplies base Incrementy gain by 1e9.";
					if(hasUpgrade("incrementy_m",21) || player.incrementy_m.challenges[12])return "Each Matter Upgrade multiplies base Incrementy gain by 1e6.";
					return "Each Matter Upgrade multiplies base Incrementy gain by 1e4.";
				},
                cost: new Decimal(20),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
                    let ret=Decimal.pow(1e4,player.incrementy_m.upgrades.length);
					if(hasUpgrade("incrementy_m",21))ret=ret.pow(1.5);
					if(player.incrementy_m.challenges[12])ret=ret.pow(1.5);
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			12: {
				title: "Matter Upgrade 12",
                description: "Incrementy Upgrade 12 is squared.",
                cost: new Decimal(20),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			13: {
				title: "Matter Upgrade 13",
                description: "Autobuy Incrementy Stamina.",
                cost: new Decimal(50),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			14: {
				title: "Matter Upgrade 14",
                description: "Incrementy Upgrade 35's effect ^5.",
                cost: new Decimal(150),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			15: {
				title: "Matter Upgrade 15",
                description: "Unlock Energy.",
                cost: new Decimal(300),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			21: {
				title: "Matter Upgrade 21",
                description: "Matter Upgrade 11's effect ^1.5.",
                cost: new Decimal(1e40),
                unlocked() { return player.tm.buyables[5].gte(5); }, // The upgrade is only visible when this is true
			},
			22: {
				title: "Matter Upgrade 22",
                description: "Boost Matter gain by Incrementy Stamina levels.",
                cost: new Decimal(1e45),
                unlocked() { return player.tm.buyables[5].gte(5); }, // The upgrade is only visible when this is true
				effect() {
                    let ret=player.incrementy_i.buyables[13].add(1).pow(1.2);
					ret=Decimal.pow(1.1,ret);
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			23: {
				title: "Matter Upgrade 23",
                description: "Unlock a matter challenge.",
                cost: new Decimal(1e62),
                unlocked() { return player.tm.buyables[5].gte(6); }, // The upgrade is only visible when this is true
			},
			24: {
				title: "Matter Upgrade 24",
                description: "Matter gain is boosted by your amoebas.",
                cost: new Decimal(1e70),
                unlocked() { return player.tm.buyables[5].gte(6); }, // The upgrade is only visible when this is true
				effect() {
					if(hasUpgrade("incrementy_m", 31))return player.incrementy_a.points.add(1);
                    let base=3;
                    let ret = Decimal.pow(base,Decimal.log10(player.incrementy_a.points.add(1)).pow(0.9));
                    return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			25: {
				title: "Matter Upgrade 25",
                description: "Unlock a matter challenge.",
                cost: new Decimal(1e110),
                unlocked() { return player.tm.buyables[5].gte(6); }, // The upgrade is only visible when this is true
			},
			31: {
				title: "Matter Upgrade 31",
                description: "Matter Upgrade 24 is better.",
                cost: new Decimal("e225e4"),
                unlocked() { return hasUpgrade("incrementy_a",34); }, // The upgrade is only visible when this is true
			},
			32: {
				title: "Matter Upgrade 32",
                description: "Incrementy Upgrade 32 is better.",
                cost: new Decimal("e238e4"),
                unlocked() { return hasUpgrade("incrementy_a",34); }, // The upgrade is only visible when this is true
			},
			33: {
				title: "Matter Upgrade 33",
                description: "Incrementy Upgrade 31 is better.",
                cost: new Decimal("e242e4"),
                unlocked() { return hasUpgrade("incrementy_a",34); }, // The upgrade is only visible when this is true
			},
			34: {
				title: "Matter Upgrade 34",
                description: "Incrementy Strength provide free Incrementy Speed.",
                cost: new Decimal("e2435e3"),
                unlocked() { return hasUpgrade("incrementy_a",34); }, // The upgrade is only visible when this is true
			},
			35: {
				title: "Matter Upgrade 35",
                description: "Matter boost Super Prestige point gain.",
                cost: new Decimal("e244e4"),
                unlocked() { return hasUpgrade("incrementy_a",34); }, // The upgrade is only visible when this is true
				effect() {
                    let ret = player.incrementy_m.points.add(1e100).log10().log10();
                    return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
	 },
	passiveGeneration(){
		if(hasUpgrade("incrementy_e",11)&&player.incrementy_sp.best.gte(2))return 1e4;
		if(hasUpgrade("incrementy_e",11))return 100;
		return 0;
	},
	challenges:{
                rows: 1,
                cols: 2,
                11: {
                        name: "Creak", 
                        challengeDescription: "Amoebas base effects are 1 and square root Incrementy gain",
                        rewardDescription: "Incrementy Stamina softcap starts 5 later (45 -> 50)",
                        unlocked(){
                                return hasUpgrade("incrementy_m",23)
                        },
                        goal: new Decimal("1e2100"),
                        currencyLayer: "modpoints",
                        currencyInternalName: "5",
		                currencyDisplayName: "incrementy",
                },
                12: {
                        name: "Creek", 
                        challengeDescription: "Amoebas and Antimatter base effects are 1 and cube root Incrementy gain",
                        rewardDescription: "Matter Upgrade 11's effect ^1.5",
                        unlocked(){
                                return hasUpgrade("incrementy_m",25)
                        },
                        goal: new Decimal("1e960"),
                        currencyLayer: "modpoints",
                        currencyInternalName: "5",
		                currencyDisplayName: "incrementy",
                },
        },
});


addLayer("incrementy_e", {
    name: "incrementy_e", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#E3FF00",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "energy", // Name of prestige currency
    baseResource: "least amount of Matter and Antimatter", // Name of resource prestige is based on
    baseAmount() {return player.incrementy_m.points.min(player.incrementy_am.points)}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(hasUpgrade("incrementy_e",13))mult=mult.mul(upgradeEffect("incrementy_e",13));
		if(hasUpgrade("incrementy_n",22))mult = mult.mul(buyableEffect("incrementy_n",23));
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ["incrementy_am","incrementy_m"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(3) && hasUpgrade("incrementy_m",15) && (!player.incrementy_pi.hidelayers);},
		doReset(l){
			if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_e",["upgrades","milestones","challenges"]);
			return;
		},
		
	 upgrades: {
            rows: 3,
            cols: 5,
			11: {
				title: "Energy Upgrade 11",
                description(){return  "Gain "+(player.incrementy_sp.best.gte(2)?"1e6":10000)+"% of energy and matter gain per second."},
                cost: new Decimal(1),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			12: {
				title: "Energy Upgrade 12",
                description: "Boost matter gain based on your energy.",
                cost: new Decimal(1e9),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
                    let base=10;
                    let ret = Decimal.pow(base,Decimal.log10(player.incrementy_e.points.add(1)).pow(0.9));
                    return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			13: {
				title: "Energy Upgrade 13",
                description: "Boost energy gain based on your incrementy.",
                cost: new Decimal(1e30),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
                    let base=1.01;
					if(hasMilestone("incrementy_o",2))base = 1.005;
                    let ret = Decimal.pow(base,Decimal.log10(player.modpoints[5].add(1)).pow(0.9));
                    return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			14: {
				title: "Energy Upgrade 14",
                description: "Each Energy Upgrade multiplies Incrementy gain by 1e50.",
                cost: new Decimal(1e50),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
                    let ret=Decimal.pow(1e50,player.incrementy_e.upgrades.length);
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			15: {
				title: "Energy Upgrade 15",
                description: "Boost Matter gain by Incrementy Speed levels.",
                cost: new Decimal(1e100),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					if(hasUpgrade("incrementy_e",33))return Decimal.pow(10,player.incrementy_i.buyables[11]);
					if(hasUpgrade("incrementy_e",31))return Decimal.pow(3,player.incrementy_i.buyables[11]);
                    let ret=player.incrementy_i.buyables[11].add(1);
					ret=Decimal.pow(1.01,ret);
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			21: {
				title: "Energy Upgrade 21",
                description(){
					if(hasUpgrade("incrementy_e",25) && player.incrementy_m.challenges[12])return "Each Energy Upgrade multiplies matter gain by 1e8.";
					return "Each Energy Upgrade multiplies matter gain by 1e5.";
				},
                cost: new Decimal(1e175),
                unlocked() { return player.tm.buyables[5].gte(8); }, // The upgrade is only visible when this is true
				effect() {
                    let ret=Decimal.pow(1e5,player.incrementy_e.upgrades.length);
					if(hasUpgrade("incrementy_e",25))ret=ret.pow(1.6);
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			22: {
				title: "Energy Upgrade 22",
                description: "Incrementy Stamina softcap starts 1 later (50 -> 51)",
                cost: new Decimal(1e257),
                unlocked() { return player.tm.buyables[5].gte(8); }, // The upgrade is only visible when this is true
			},
			23: {
				title: "Energy Upgrade 23",
                description: "The level of this tree boost matter gain.",
                cost: new Decimal(1e272),
                unlocked() { return player.tm.buyables[5].gte(9); }, // The upgrade is only visible when this is true
				effect() {
                    let ret=Decimal.pow(2,player.tm.buyables[5].pow(1.5));
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			24: {
				title: "Energy Upgrade 24",
                description: "Incrementy Stamina softcap starts 1 later (51 -> 52)",
                cost: new Decimal("1e313"),
                unlocked() { return player.tm.buyables[5].gte(9); }, // The upgrade is only visible when this is true
			},
			25: {
				title: "Energy Upgrade 25",
                description: "Energy Upgrade 21's effect ^1.6",
                cost: new Decimal("1e335"),
                unlocked() { return player.tm.buyables[5].gte(9); }, // The upgrade is only visible when this is true
			},
			31: {
				title: "Energy Upgrade 31",
                description: "Energy Upgrade 15 is better.",
                cost: new Decimal("e38e5"),
                unlocked() { return hasUpgrade("incrementy_sp",55); }, // The upgrade is only visible when this is true
			},
			32: {
				title: "Energy Upgrade 32",
                description: "Matter gain softcap starts later.",
                cost: new Decimal("e45e5"),
                unlocked() { return hasUpgrade("incrementy_sp",55); }, // The upgrade is only visible when this is true
			},
			33: {
				title: "Energy Upgrade 33",
                description: "Energy Upgrade 15 is better.",
                cost: new Decimal("e533e4"),
                unlocked() { return hasUpgrade("incrementy_sp",55); }, // The upgrade is only visible when this is true
			},
			34: {
				title: "Energy Upgrade 34",
                description: "Incrementy Upgrade 45 effect is changed.",
                cost: new Decimal("e606e4"),
                unlocked() { return hasUpgrade("incrementy_sp",55); }, // The upgrade is only visible when this is true
			},
			35: {
				title: "Energy Upgrade 35",
                description: "Base Antimatter gain is better. (10x per incrementy buyable level)",
                cost: new Decimal("ee7"),
                unlocked() { return hasUpgrade("incrementy_sp",55); }, // The upgrade is only visible when this is true
			},
	 },
	 resetsNothing: true,
	passiveGeneration(){
		if(hasUpgrade("incrementy_e",11)&&player.incrementy_sp.best.gte(2))return 1e4;
		if(hasUpgrade("incrementy_e",11))return 100;
		return 0;
	}
});


addLayer("incrementy_p", {
    name: "incrementy_p", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FFC0F0",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Particles", // Name of prestige currency
    baseResource: "incrementy", // Name of resource prestige is based on
    baseAmount() {return player.modpoints[5]}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(hasUpgrade("incrementy_n",13))mult = mult.mul(buyableEffect("incrementy_n",12));
		if(hasUpgrade("incrementy_n",22))mult = mult.mul(buyableEffect("incrementy_n",22));
		if(hasUpgrade("incrementy_g",13))mult = mult.mul(upgradeEffect("incrementy_g",13));
		if(hasUpgrade("incrementy_p",31))mult = mult.mul(buyableEffect("incrementy_p",11));
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        mult = new Decimal(1)
		if(hasUpgrade("incrementy_n",24))mult = mult.mul(1.5);
		if(hasUpgrade("incrementy_g",14))mult = mult.mul(upgradeEffect("incrementy_g",14));
		if(hasUpgrade("incrementy_am",33))mult = mult.mul(1.05);
        return mult
    },
	getResetGain() {
		if(hasUpgrade("incrementy_n",23))return layers.incrementy_p.getResetGainReal();
		let ret=layers.incrementy_p.getResetGainReal();
		return Decimal.min(ret,ret.mul(60).sub(player.incrementy_p.points)).max(0);
	},
	getResetGainReal() {
		let ret=player.modpoints[5];
		if(ret.lt(1))return new Decimal(0);
		if(hasUpgrade("incrementy_n",15))ret=ret.log10().pow(2).pow(layers.incrementy_p.gainExp());
		else ret=ret.log10().div(20000).sqrt().pow(layers.incrementy_p.gainExp());
		ret=ret.mul(layers.incrementy_p.gainMult());
		return ret;
	},
	canReset() {
		return layers.incrementy_p.getResetGain().gt(0);
	},
        prestigeButtonText(){
				if(layers.incrementy_p.getResetGain().lte(0))return "+<b>0</b> Particles";
				if(layers.incrementy_p.getResetGain().lt(1e-3))return "+<b>"+exponentialFormat1(layers.incrementy_p.getResetGain(),2)+"</b> Particles";
				if(layers.incrementy_p.getResetGain().lt(1))return "+<b>"+format(layers.incrementy_p.getResetGain(),4)+"</b> Particles";
                return "+<b>"+format(layers.incrementy_p.getResetGain())+"</b> Particles";
        },
	getNextAt() {
		let ret=tmp.incrementy_p.getResetGainReal.plus(1).floor();
		ret=ret.div(layers.incrementy_p.gainMult()).max(1);
		if(hasUpgrade("incrementy_n",15))ret=ret.sqrt().root(layers.incrementy_p.gainExp());
		else ret=ret.pow(2).mul(20000).root(layers.incrementy_p.gainExp());
		ret=Decimal.pow(10,ret);
		return ret;
	},
    branches: ["incrementy_i","incrementy_n","incrementy_g","incrementy_q"],
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(10);},
		doReset(l){
			if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_p",["upgrades","milestones","challenges"]);
			return;
		},
		
	 tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
						"milestones",
					["display-text",function(){if(hasUpgrade("incrementy_n",23))return "";return "Particle Cap: "+format(tmp.incrementy_p.getResetGainReal.mul(60))+" (based on your incrementy)"}],
					"upgrades","buyables"
				],
	 resetsNothing: true,
	passiveGeneration(){
		if(player.incrementy_sp.best.gte(3)&&hasUpgrade("incrementy_p",11))return 1e4;
		if(hasUpgrade("incrementy_s",11)&&hasUpgrade("incrementy_p",11))return 100;
		if(hasUpgrade("incrementy_p",11))return 1;
		return 0;
	},
	
	 upgrades: {
            rows: 3,
            cols: 5,
			11: {
				title: "Particle Upgrade 11",
                description(){return "Gain "+(player.incrementy_sp.best.gte(3)?"1e6":hasUpgrade("incrementy_s",11)?10000:100)+"% of particle gain per second."},
                cost: new Decimal(15),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			12: {
				title: "Particle Upgrade 12",
                description: "Unlock Neutrinos.",
                cost: new Decimal(65),
                unlocked() { return player.tm.buyables[5].gte(11); }, // The upgrade is only visible when this is true
			},
			13: {
				title: "Particle Upgrade 13",
                description: "Neutrino gain exponent is multiplied by 1.35",
                cost: new Decimal(6e13),
                unlocked() { return player.tm.buyables[5].gte(11); }, // The upgrade is only visible when this is true
			},
			14: {
				title: "Particle Upgrade 14",
                description: "Neutrino gain is boosted by neutrinos.",
                cost: new Decimal(2e14),
                unlocked() { return player.tm.buyables[5].gte(11); }, // The upgrade is only visible when this is true
				effect() {
                    let base=1.5;
                    let ret = Decimal.pow(base,Decimal.log10(player.incrementy_n.points.add(1)).pow(0.9));
					if(hasUpgrade("incrementy_n",21))ret=ret.pow(2);
					if(hasUpgrade("incrementy_p",22))ret=ret.pow(2);
                    return ret;
				},
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			15: {
				title: "Particle Upgrade 15",
                description: "Incrementy Upgrade 12 is squared.",
                cost: new Decimal(5e14),
                unlocked() { return player.tm.buyables[5].gte(11); }, // The upgrade is only visible when this is true
			},
			21: {
				title: "Particle Upgrade 21",
                description: "Neutrino gain exponent is multiplied by 1.1",
                cost: new Decimal(1e55),
                unlocked() { return player.tm.buyables[5].gte(13); }, // The upgrade is only visible when this is true
			},
			22: {
				title: "Particle Upgrade 22",
                description: "Particle Upgrade 14 is squared.",
                cost: new Decimal(1e90),
                unlocked() { return player.tm.buyables[5].gte(13); }, // The upgrade is only visible when this is true
			},
			23: {
				title: "Particle Upgrade 23",
                description: "Particle Upgrades add to first column of neutrino buyables.",
                cost: new Decimal(1e150),
                unlocked() { return player.tm.buyables[5].gte(13); }, // The upgrade is only visible when this is true
			},
			24: {
				title: "Particle Upgrade 24",
                description: "Particle Upgrades add to second column of neutrino buyables.",
                cost: new Decimal(1e153),
                unlocked() { return player.tm.buyables[5].gte(13); }, // The upgrade is only visible when this is true
			},
			25: {
				title: "Particle Upgrade 25",
                description: "Particle Upgrades add to third column of neutrino buyables.",
                cost: new Decimal(1e219),
                unlocked() { return player.tm.buyables[5].gte(13); }, // The upgrade is only visible when this is true
			},
			31: {
				title: "Particle Upgrade 31",
                description: "Unlock the first Particle buyable.",
                cost: new Decimal("1e943"),
                unlocked() { return player.tm.buyables[5].gte(18); }, // The upgrade is only visible when this is true
			},
			32: {
				title: "Particle Upgrade 32",
                description: "Unlock the second Particle buyable.",
                cost: new Decimal("1e1045"),
                unlocked() { return hasChallenge("incrementy_q",22); }, // The upgrade is only visible when this is true
			},
			33: {
				title: "Particle Upgrade 33",
                description: "Particle Acceleration add to first column of neutrino buyables.",
                cost: new Decimal("1e1096"),
                unlocked() { return hasChallenge("incrementy_q",22); }, // The upgrade is only visible when this is true
			},
			34: {
				title: "Particle Upgrade 34",
                description(){
					if(hasUpgrade("incrementy_pi",25))return "Gain "+format(player.incrementy_p.points.add(1e3))+"x more rewritten points in TPTR, and "+format(player.incrementy_s.points.add(10))+"x more experience/cash in Game Dev Tree.";
					return "Gain 1e3x more rewritten points in TPTR, and 10x more experience in Game Dev Tree.";
				},
                cost: new Decimal("1e1170"),
                unlocked() { return hasChallenge("incrementy_q",22); }, // The upgrade is only visible when this is true
			},
			35: {
				title: "Particle Upgrade 35",
                description: "Unlock the third Particle buyable.",
                cost: new Decimal("1e1250"),
                unlocked() { return hasChallenge("incrementy_q",22); }, // The upgrade is only visible when this is true
			},
	 },
	 buyables:{
                rows: 1, 
                cols: 3,
                11: {
                        title: "Particle Acceleration",
						cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
							let cost = Decimal.pow(2, x.pow(3)).mul("1e990");
							return cost
						},
						display() { // Everything else displayed in the buyable button after the title
							let data = tmp[this.layer].buyables[this.id]
							return "Amount: "+formatWhole(player.incrementy_p.buyables[11])+"+"+formatWhole(data.free)+"<br>"+
							"Cost: "+format(data.cost)+" Particles<br>"+
							"Effect: Particle gain x"+format(data.effect);
						},
                        unlocked(){ return hasUpgrade("incrementy_p", 31) },
						canAfford() {
							return player.incrementy_p.points.gte(tmp[this.layer].buyables[this.id].cost);
						},
						buy() { 
							cost = tmp[this.layer].buyables[this.id].cost
							player.incrementy_n.points = player.incrementy_n.points.sub(cost)
							player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
						},
						effect(){
							let base=new Decimal(100);
							return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
						},
						free(){
							let ret=new Decimal(0);
							if(hasUpgrade("incrementy_s",21))ret=ret.add(player.incrementy_s.upgrades.length||0);
							if(hasUpgrade("incrementy_s",22))ret=ret.add(player.incrementy_p.buyables[12]);
							if(hasUpgrade("incrementy_s",22))ret=ret.add(layers.incrementy_p.buyables[12].free());
							if(hasUpgrade("incrementy_b",31))ret=ret.add(player.incrementy_b.upgrades.length||0);
							if(hasUpgrade("incrementy_b",33))ret=ret.add(player.incrementy_b.challenges[11]);
							if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[12]);
							if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[21]);
							if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[22]);
							return ret;
						}
                },
                12: {
                        title: "Particle Collision",
						cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
							let cost = Decimal.pow(2, x.pow(3)).mul("1e1090");
							return cost
						},
						display() { // Everything else displayed in the buyable button after the title
							let data = tmp[this.layer].buyables[this.id]
							return "Amount: "+formatWhole(player.incrementy_p.buyables[12])+"+"+formatWhole(data.free)+"<br>"+
							"Cost: "+format(data.cost)+" Particles<br>"+
							"Effect: Neutrino and Quark gain x"+format(data.effect);
						},
                        unlocked(){ return hasUpgrade("incrementy_p", 32) },
						canAfford() {
							return player.incrementy_p.points.gte(tmp[this.layer].buyables[this.id].cost);
						},
						buy() { 
							cost = tmp[this.layer].buyables[this.id].cost
							player.incrementy_n.points = player.incrementy_n.points.sub(cost)
							player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
						},
						effect(){
							let base=new Decimal(1e7);
							return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
						},
						free(){
							let ret=new Decimal(0);
							if(hasUpgrade("incrementy_s",21))ret=ret.add(player.incrementy_s.upgrades.length||0);
							if(hasUpgrade("incrementy_s",23))ret=ret.add(player.incrementy_p.buyables[13]);
							if(hasUpgrade("incrementy_s",23))ret=ret.add(layers.incrementy_p.buyables[13].free());
							if(hasUpgrade("incrementy_b",31))ret=ret.add(player.incrementy_b.upgrades.length||0);
							if(hasUpgrade("incrementy_b",33))ret=ret.add(player.incrementy_b.challenges[11]);
							if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[12]);
							if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[21]);
							if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[22]);
							return ret;
						}
                },
                13: {
                        title: "Particle Simulation",
						cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
							let cost = Decimal.pow(5, x.pow(3)).mul("1e1250");
							return cost
						},
						display() { // Everything else displayed in the buyable button after the title
							let data = tmp[this.layer].buyables[this.id]
							return "Amount: "+formatWhole(player.incrementy_p.buyables[13])+"+"+formatWhole(data.free)+"<br>"+
							"Cost: "+format(data.cost)+" Particles<br>"+
							"Effect: Gluons, Matter, and Neutrinos gain x"+format(data.effect);
						},
                        unlocked(){ return hasUpgrade("incrementy_p", 35) },
						canAfford() {
							return player.incrementy_p.points.gte(tmp[this.layer].buyables[this.id].cost);
						},
						buy() { 
							cost = tmp[this.layer].buyables[this.id].cost
							player.incrementy_n.points = player.incrementy_n.points.sub(cost)
							player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
						},
						effect(){
							let base=new Decimal(1e10);
							return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
						},
						free(){
							let ret=new Decimal(0);
							if(hasUpgrade("incrementy_s",21))ret=ret.add(player.incrementy_s.upgrades.length||0);
							if(hasUpgrade("incrementy_b",31))ret=ret.add(player.incrementy_b.upgrades.length||0);
							if(hasUpgrade("incrementy_b",33))ret=ret.add(player.incrementy_b.challenges[11]);
							if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[12]);
							if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[21]);
							if(hasUpgrade("incrementy_b",34))ret=ret.add(player.incrementy_b.challenges[22]);
							ret=ret.add(layers.incrementy_b.challenges[22].rewardEffect()[1])
							return ret;
						}
                },
	 },
		update(diff){
					if(hasUpgrade("incrementy_s",12)){
						var target=player.incrementy_p.points.div("1e990").add(1).log(2).pow(1/3).add(1).floor();
						if(target.gt(player.incrementy_p.buyables[11])){
							player.incrementy_p.buyables[11]=target;
						}
					}
					if(hasUpgrade("incrementy_s",12)){
						var target=player.incrementy_p.points.div("1e1090").add(1).log(2).pow(1/3).add(1).floor();
						if(target.gt(player.incrementy_p.buyables[12])){
							player.incrementy_p.buyables[12]=target;
						}
					}
					if(hasUpgrade("incrementy_s",12)){
						var target=player.incrementy_p.points.div("1e1250").add(1).log(5).pow(1/3).add(1).floor();
						if(target.gt(player.incrementy_p.buyables[13])){
							player.incrementy_p.buyables[13]=target;
						}
					}
		},
	 
});


addLayer("incrementy_n", {
    name: "incrementy_n", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#B5F146",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Neutrinos", // Name of prestige currency
    baseResource: "Particles", // Name of resource prestige is based on
    baseAmount() {return player.incrementy_p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        ret = new Decimal(1)
		if(hasUpgrade("incrementy_p",13))ret = ret.mul(1.35);
		if(hasUpgrade("incrementy_p",21))ret = ret.mul(1.1);
		if(hasUpgrade("incrementy_g",15))ret = ret.mul(upgradeEffect("incrementy_g",15));
        if (inChallenge("incrementy_sp", 12)) ret = ret.div(100)
        return ret
    },
	gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(hasUpgrade("incrementy_n",12))mult = mult.mul(buyableEffect("incrementy_n",11));
		if(hasUpgrade("incrementy_p",14))mult = mult.mul(upgradeEffect("incrementy_p",14));
		if(hasUpgrade("incrementy_g",12))mult = mult.mul(upgradeEffect("incrementy_g",12));
		if(hasUpgrade("incrementy_i",44))mult = mult.mul(upgradeEffect("incrementy_i",44));
		if(hasUpgrade("incrementy_p",32))mult = mult.mul(buyableEffect("incrementy_p",12));
		if(hasUpgrade("incrementy_p",35))mult = mult.mul(buyableEffect("incrementy_p",13));
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.tm.currentTree==5 && hasUpgrade("incrementy_p",12);},
		doReset(l){
			if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_n",["upgrades","milestones","challenges"]);
			return;
		},
		
	 tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
						"milestones",
						"buyables",
					"upgrades"
				],
	 resetsNothing: true,
	passiveGeneration(){
		if(player.incrementy_sp.best.gte(3)&&hasUpgrade("incrementy_n",11))return 1e4;
		if(hasUpgrade("incrementy_s",11)&&hasUpgrade("incrementy_n",11))return 100;
		if(hasUpgrade("incrementy_n",11))return 1;
		return 0;
	},
	
	 upgrades: {
            rows: 2,
            cols: 5,
			11: {
				title: "Neutrino Upgrade 11",
                description(){return "Gain "+(player.incrementy_sp.best.gte(3)?"1e6":hasUpgrade("incrementy_s",11)?10000:100)+"% of Neutrino gain per second."},
                cost: new Decimal(15),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			12: {
				title: "Neutrino Upgrade 12",
                description: "Unlock a neutrino buyable.",
                cost: new Decimal(1e3),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			13: {
				title: "Neutrino Upgrade 13",
                description: "Unlock a neutrino buyable.",
                cost: new Decimal(1e6),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			14: {
				title: "Neutrino Upgrade 14",
                description: "Unlock a neutrino buyable.",
                cost: new Decimal(1e12),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			15: {
				title: "Neutrino Upgrade 15",
                description: "Base particle gain formula is better.",
                cost: new Decimal(1e18),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			21: {
				title: "Neutrino Upgrade 21",
                description: "Particle Upgrade 14 is squared.",
                cost: new Decimal(1e54),
                unlocked() { return player.tm.buyables[5].gte(12); }, // The upgrade is only visible when this is true
			},
			22: {
				title: "Neutrino Upgrade 22",
                description: "Unlock 3 neutrino buyables.",
                cost: new Decimal(1e65),
                unlocked() { return player.tm.buyables[5].gte(12); }, // The upgrade is only visible when this is true
			},
			23: {
				title: "Neutrino Upgrade 23",
                description: "Remove Particle Cap.",
                cost: new Decimal(1e169),
                unlocked() { return player.tm.buyables[5].gte(12); }, // The upgrade is only visible when this is true
			},
			24: {
				title: "Neutrino Upgrade 24",
                description: "Base particle gain exponent is multiplied by 1.5",
                cost: new Decimal(1e175),
                unlocked() { return player.tm.buyables[5].gte(12); }, // The upgrade is only visible when this is true
			},
			25: {
				title: "Neutrino Upgrade 25",
                description: "Unlock 3 neutrino buyables.",
                cost: new Decimal(1e200),
                unlocked() { return player.tm.buyables[5].gte(13); }, // The upgrade is only visible when this is true
			},
	 },
		update(diff){
					if(hasUpgrade("incrementy_s",11)){
						var target=player.incrementy_n.points.div(100).add(1).log(1.25).pow(1/2).add(1).floor();
						if(target.gt(player.incrementy_n.buyables[11])){
							player.incrementy_n.buyables[11]=target;
						}
					}
					if(hasUpgrade("incrementy_s",11)){
						var target=player.incrementy_n.points.div(1e6).add(1).log(1.5).pow(1/2).add(1).floor();
						if(target.gt(player.incrementy_n.buyables[12])){
							player.incrementy_n.buyables[12]=target;
						}
					}
					if(hasUpgrade("incrementy_s",11)){
						var target=player.incrementy_n.points.div(1e11).add(1).log(2).pow(1/2).add(1).floor();
						if(target.gt(player.incrementy_n.buyables[13])){
							player.incrementy_n.buyables[13]=target;
						}
					}
					if(hasUpgrade("incrementy_s",11)){
						var target=player.incrementy_n.points.div(1e50).add(1).log(2.5).pow(1/2).add(1).floor();
						if(target.gt(player.incrementy_n.buyables[21])){
							player.incrementy_n.buyables[21]=target;
						}
					}
					if(hasUpgrade("incrementy_s",11)){
						var target=player.incrementy_n.points.div(1e70).add(1).log(5).pow(1/2).add(1).floor();
						if(target.gt(player.incrementy_n.buyables[22])){
							player.incrementy_n.buyables[22]=target;
						}
					}
					if(hasUpgrade("incrementy_s",11)){
						var target=player.incrementy_n.points.div(1e110).add(1).log(125).pow(1/2).add(1).floor();
						if(target.gt(player.incrementy_n.buyables[23])){
							player.incrementy_n.buyables[23]=target;
						}
					}
					if(hasUpgrade("incrementy_s",11)){
						var target=player.incrementy_n.points.div(1e150).add(1).log(1000).pow(1/2).add(1).floor();
						if(target.gt(player.incrementy_n.buyables[31])){
							player.incrementy_n.buyables[31]=target;
						}
					}
					if(hasUpgrade("incrementy_s",11)){
						var target=player.incrementy_n.points.div(1e200).add(1).log(1250).pow(1/2).add(1).floor();
						if(target.gt(player.incrementy_n.buyables[32])){
							player.incrementy_n.buyables[32]=target;
						}
					}
					if(hasUpgrade("incrementy_s",11)){
						var target=player.incrementy_n.points.div(1e250).add(1).log(1e10).pow(1/2).add(1).floor();
						if(target.gt(player.incrementy_n.buyables[33])){
							player.incrementy_n.buyables[33]=target;
						}
					}
		},
	 
	 buyables:{
		 rows: 3,
		 cols: 3,
		 11: {
                title: "Neutrino Generation",
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(1.25, x.pow(2)).mul(100);
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Amount: "+formatWhole(player.incrementy_n.buyables[11])+"+"+formatWhole(data.free)+"<br>"+
					"Cost: "+format(data.cost)+" Neutrinos<br>"+
					"Effect: Neutrino gain x"+format(data.effect);
                },
                unlocked() { return hasUpgrade("incrementy_n",12) }, 
                canAfford() {
					return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
				effect(){
                                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
					let base=new Decimal(3);
					if(hasUpgrade("incrementy_g",23))base=base.add(1.5);
					if(hasUpgrade("incrementy_s",12))base=base.add(0.9);
                    base = base.plus(layers.incrementy_b.challenges[11].rewardEffect())
					return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
				},
				free(){
					let ret=player.incrementy_n.buyables[12];
					ret=ret.add(layers.incrementy_n.buyables[12].free());
					ret=ret.add(player.incrementy_n.buyables[21]);
					ret=ret.add(layers.incrementy_n.buyables[21].free());
					if(hasUpgrade("incrementy_p",23))ret=ret.add(player.incrementy_p.upgrades.length||0);
					if(hasUpgrade("incrementy_p",33))ret=ret.add(player.incrementy_p.buyables[11]);
					if(hasUpgrade("incrementy_p",33))ret=ret.add(layers.incrementy_p.buyables[11].free());
					if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
					return ret;
				}
        },
		 12: {
                title: "Particle Generation",
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(1.5, x.pow(2)).mul(1e6);
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Amount: "+formatWhole(player.incrementy_n.buyables[12])+"+"+formatWhole(data.free)+"<br>"+
					"Cost: "+format(data.cost)+" Neutrinos<br>"+
					"Effect: Particle gain x"+format(data.effect);
                },
                unlocked() { return hasUpgrade("incrementy_n",13) }, 
                canAfford() {
					return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
				effect(){
                                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
					let base=new Decimal(1.4);
                    base = base.plus(layers.incrementy_b.challenges[22].rewardEffect()[0])
					return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
				},
				free(){
					let ret=player.incrementy_n.buyables[13];
					ret=ret.add(layers.incrementy_n.buyables[13].free());
					ret=ret.add(player.incrementy_n.buyables[22]);
					ret=ret.add(layers.incrementy_n.buyables[22].free());
					if(hasUpgrade("incrementy_p",24))ret=ret.add(player.incrementy_p.upgrades.length||0);
					if(hasUpgrade("incrementy_s",14))ret=ret.add(player.incrementy_p.buyables[12]);
					if(hasUpgrade("incrementy_s",14))ret=ret.add(layers.incrementy_p.buyables[12].free());
					if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
					return ret;
				}
        },
		 13: {
                title: "Base Incrementy Gain",
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(2, x.pow(2)).mul(1e11);
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Amount: "+formatWhole(player.incrementy_n.buyables[13])+"+"+formatWhole(data.free)+"<br>"+
					"Cost: "+format(data.cost)+" Neutrinos<br>"+
					"Effect: Base incrementy gain x"+format(data.effect);
                },
                unlocked() { return hasUpgrade("incrementy_n",14) }, 
                canAfford() {
					return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
				effect(){
                                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
					let base=new Decimal(1e5);
					if (inChallenge("incrementy_b", 12))  base= base.pow(new Decimal(2).div(3 + challengeCompletions("incrementy_b", 12)));
                     if (inChallenge("incrementy_b", 21)) return new Decimal(1)
					return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
				},
				free(){
					let ret=player.incrementy_n.buyables[23];
					ret=ret.add(layers.incrementy_n.buyables[23].free());
					if(hasUpgrade("incrementy_p",25))ret=ret.add(player.incrementy_p.upgrades.length||0);
					if(hasUpgrade("incrementy_s",15))ret=ret.add(player.incrementy_p.buyables[13]);
					if(hasUpgrade("incrementy_s",15))ret=ret.add(layers.incrementy_p.buyables[13].free());
					if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
					return ret;
				}
        },
		 21: {
                title: "Incrementy Boost",
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(2.5, x.pow(2)).mul(1e50);
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Amount: "+formatWhole(player.incrementy_n.buyables[21])+"+"+formatWhole(data.free)+"<br>"+
					"Cost: "+format(data.cost)+" Neutrinos<br>"+
					"Effect: Incrementy gain x"+format(data.effect)+" (based on neutrinos)";
                },
                unlocked() { return hasUpgrade("incrementy_n",22) }, 
                canAfford() {
					return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
				effect(){
                                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
					let base=player.incrementy_n.best.plus(10).log10().pow(10);
					return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
				},
				free(){
					let ret=player.incrementy_n.buyables[22];
					ret=ret.add(layers.incrementy_n.buyables[22].free());
					ret=ret.add(player.incrementy_n.buyables[31]);
					ret=ret.add(layers.incrementy_n.buyables[31].free());
					if(hasUpgrade("incrementy_p",23))ret=ret.add(player.incrementy_p.upgrades.length||0);
					if(hasUpgrade("incrementy_p",33))ret=ret.add(player.incrementy_p.buyables[11]);
					if(hasUpgrade("incrementy_p",33))ret=ret.add(layers.incrementy_p.buyables[11].free());
					if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
					return ret;
				}
        },
		 22: {
                title: "Particle Boost",
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(5, x.pow(2)).mul(1e70);
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Amount: "+formatWhole(player.incrementy_n.buyables[22])+"+"+formatWhole(data.free)+"<br>"+
					"Cost: "+format(data.cost)+" Neutrinos<br>"+
					"Effect: Particle gain x"+format(data.effect)+" (based on neutrinos)";
                },
                unlocked() { return hasUpgrade("incrementy_n",22) }, 
                canAfford() {
					return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
				effect(){
                                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
					let base=player.incrementy_n.best.plus(10).log10().pow(0.5);
                                base = base.times(layers.incrementy_sp.challenges[22].rewardEffect())
					return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
				},
				free(){
					let ret=player.incrementy_n.buyables[23];
					ret=ret.add(layers.incrementy_n.buyables[23].free());
					ret=ret.add(player.incrementy_n.buyables[32]);
					ret=ret.add(layers.incrementy_n.buyables[32].free());
					if(hasUpgrade("incrementy_p",24))ret=ret.add(player.incrementy_p.upgrades.length||0);
					if(hasUpgrade("incrementy_s",14))ret=ret.add(player.incrementy_p.buyables[12]);
					if(hasUpgrade("incrementy_s",14))ret=ret.add(layers.incrementy_p.buyables[12].free());
					if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
					return ret;
				}
        },
		 23: {
                title: "Energy Boost",
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(125, x.pow(2)).mul(1e110);
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Amount: "+formatWhole(player.incrementy_n.buyables[23])+"+"+formatWhole(data.free)+"<br>"+
					"Cost: "+format(data.cost)+" Neutrinos<br>"+
					"Effect: Energy gain x"+format(data.effect);
                },
                unlocked() { return hasUpgrade("incrementy_n",22) }, 
                canAfford() {
					return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
				effect(){
                                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
					let base=new Decimal(100);
					return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
				},
				free(){
					let ret=player.incrementy_n.buyables[33];
					ret=ret.add(layers.incrementy_n.buyables[33].free());
					if(hasUpgrade("incrementy_p",25))ret=ret.add(player.incrementy_p.upgrades.length||0);
					if(hasUpgrade("incrementy_s",15))ret=ret.add(player.incrementy_p.buyables[13]);
					if(hasUpgrade("incrementy_s",15))ret=ret.add(layers.incrementy_p.buyables[13].free());
					if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
					return ret;
				}
        },
		 31: {
                title: "Matter Gain",
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(1000, x.pow(2)).mul(1e150);
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Amount: "+formatWhole(player.incrementy_n.buyables[31])+"+"+formatWhole(data.free)+"<br>"+
					"Cost: "+format(data.cost)+" Neutrinos<br>"+
					"Effect: Matter gain x"+format(data.effect);
                },
                unlocked() { return hasUpgrade("incrementy_n",25) }, 
                canAfford() {
					return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
				effect(){
                                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
					let base=new Decimal(25);
					return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
				},
				free(){
					let ret=player.incrementy_n.buyables[32];
					ret=ret.add(layers.incrementy_n.buyables[32].free());
					if(hasUpgrade("incrementy_p",23))ret=ret.add(player.incrementy_p.upgrades.length||0);
					if(hasUpgrade("incrementy_p",33))ret=ret.add(player.incrementy_p.buyables[11]);
					if(hasUpgrade("incrementy_p",33))ret=ret.add(layers.incrementy_p.buyables[11].free());
					if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
					return ret;
				}
        },
		 32: {
                title: "Antimatter Gain",
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(1250, x.pow(2)).mul(1e200);
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Amount: "+formatWhole(player.incrementy_n.buyables[32])+"+"+formatWhole(data.free)+"<br>"+
					"Cost: "+format(data.cost)+" Neutrinos<br>"+
					"Effect: Antimatter gain x"+format(data.effect);
                },
                unlocked() { return hasUpgrade("incrementy_n",25) }, 
                canAfford() {
					return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
				effect(){
                                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
					let base=new Decimal(10);
					return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
				},
				free(){
					let ret=player.incrementy_n.buyables[33];
					ret=ret.add(layers.incrementy_n.buyables[33].free());
					if(hasUpgrade("incrementy_p",24))ret=ret.add(player.incrementy_p.upgrades.length||0);
					if(hasUpgrade("incrementy_s",14))ret=ret.add(player.incrementy_p.buyables[12]);
					if(hasUpgrade("incrementy_s",14))ret=ret.add(layers.incrementy_p.buyables[12].free());
					if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
					return ret;
				}
        },
		 33: {
                title: "Amoeba Gain",
                cost(x=player[this.layer].buyables[this.id]) { // cost for buying xth buyable, can be an object if there are multiple currencies
                    let cost = Decimal.pow(1e10, x.pow(2)).mul(1e250);
                    return cost
                },
                display() { // Everything else displayed in the buyable button after the title
                    let data = tmp[this.layer].buyables[this.id]
                    return "Amount: "+formatWhole(player.incrementy_n.buyables[33])+"+"+formatWhole(data.free)+"<br>"+
					"Cost: "+format(data.cost)+" Neutrinos<br>"+
					"Effect: Amoeba gain x"+format(data.effect);
                },
                unlocked() { return hasUpgrade("incrementy_n",25) }, 
                canAfford() {
					return player.incrementy_n.points.gte(tmp[this.layer].buyables[this.id].cost);
				},
                buy() { 
                    cost = tmp[this.layer].buyables[this.id].cost
					player.incrementy_n.points = player.incrementy_n.points.sub(cost)
                    player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
                },
				effect(){
                                if (inChallenge("incrementy_sp", 11)) return new Decimal(1)
					let base=new Decimal(10);
					return Decimal.pow(base,player[this.layer].buyables[this.id].add(layers[this.layer].buyables[this.id].free()));
				},
				free(){
					let ret=new Decimal(0);
					if(hasUpgrade("incrementy_p",25))ret=ret.add(player.incrementy_p.upgrades.length||0);
					if(hasUpgrade("incrementy_s",15))ret=ret.add(player.incrementy_p.buyables[13]);
					if(hasUpgrade("incrementy_s",15))ret=ret.add(layers.incrementy_p.buyables[13].free());
					if(hasUpgrade("incrementy_s",13))ret=ret.add(player.incrementy_s.upgrades.length||0);
					return ret;
				}
        },
	 },
});


addLayer("incrementy_g", {
    name: "incrementy_g", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#744100",
    requires(){
		if(player.incrementy_sp.best.gte(3))return new Decimal(1);
		return new Decimal(1e300);
	},
    resource: "Gluons", // Name of prestige currency
    baseResource: "Particles", // Name of resource prestige is based on
    baseAmount() {return player.incrementy_p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        ret = new Decimal(1)
		if(hasUpgrade("incrementy_g",34))ret = ret.mul(upgradeEffect("incrementy_g",34));
        return ret
    },
	gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(hasUpgrade("incrementy_i",43))mult = mult.mul(upgradeEffect("incrementy_i",43));
		if(hasUpgrade("incrementy_p",35))mult = mult.mul(buyableEffect("incrementy_p",13));
		return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(14) && (!player.incrementy_pi.hidelayers);},
		doReset(l){
			if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_g",["upgrades","milestones","challenges"]);
			return;
		},
		
	 resetsNothing: true,
	passiveGeneration(){
		if(player.incrementy_sp.best.gte(3)&&hasUpgrade("incrementy_g",11))return 1e4;
		if(hasUpgrade("incrementy_s",11)&&hasUpgrade("incrementy_g",11))return 100;
		if(hasUpgrade("incrementy_g",11))return 1;
		return 0;
	},
	
	 upgrades: {
            rows: 3,
            cols: 5,
			11: {
				title: "Gluon Upgrade 11",
                description(){return "Gain "+(player.incrementy_sp.best.gte(3)?"1e6":hasUpgrade("incrementy_s",11)?10000:100)+"% of Gluon gain per second."},
                cost: new Decimal(15),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			12: {
				title: "Gluon Upgrade 12",
                description: "Gluons boost Neutrinos.",
                cost: new Decimal(1e25),
				effect() {
                    let base=10;
                    let ret = Decimal.pow(base,Decimal.log10(player.incrementy_g.points.add(1)).pow(0.9));
                    return ret;
				},
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			13: {
				title: "Gluon Upgrade 13",
                description: "Gluons boost Particles.",
                cost: new Decimal(1e28),
				effect() {
                    let base=1.5;
                    let ret = Decimal.pow(base,Decimal.log10(player.incrementy_g.points.add(1)).pow(0.9));
					if(hasUpgrade("incrementy_g",31))ret=ret.pow(2);
                    return ret;
				},
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			14: {
				title: "Gluon Upgrade 14",
                description: "Gluons boost Particle gain exponent.",
                cost: new Decimal(1e32),
				effect() {
                    let ret = player.incrementy_g.points.add(1).log10().pow(0.5).mul(0.1).add(1); // CRITICAL
					if(ret.gte(132.25)){ret = ret.sqrt().mul(11.5);}
					if(hasUpgrade("incrementy_g",25))ret=ret.pow(2);
					if(hasUpgrade("incrementy_g",32))ret=ret.pow(1.1);
                    return ret;
				},
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			15: {
				title: "Gluon Upgrade 15",
                description: "Gluons boost Neutrino gain exponent.",
                cost: new Decimal(1e57),
				effect() {
                    let ret = player.incrementy_g.points.add(1).log10().pow(0.2).mul(0.01).add(1);
					if(hasUpgrade("incrementy_g",33))ret=ret.pow(1.5);
                    return ret;
				},
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			21: {
				title: "Gluon Upgrade 21",
                description: "Gluons boost base Incrementy gain.",
                cost: new Decimal(1e63),
				effect() {
                    let ret = player.incrementy_g.points.add(1);
                    return ret;
				},
                unlocked() { return player.tm.buyables[5].gte(15); }, // The upgrade is only visible when this is true
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			22: {
				title: "Gluon Upgrade 22",
                description: "Incrementy Upgrade 12's effect is boosted by the level of this tree.",
                cost: new Decimal(1e64),
				effect() {
                    let ret = player.tm.buyables[5].sqrt();
                    return ret;
				},
                unlocked() { return player.tm.buyables[5].gte(15); }, // The upgrade is only visible when this is true
				effectDisplay() { return "^"+format(this.effect()) }, // Add formatting to the effect
			},
			23: {
				title: "Gluon Upgrade 23",
                description: "+1.5 to Neutrino Generation base",
                cost: new Decimal(1e65),
                unlocked() { return player.tm.buyables[5].gte(15); }, // The upgrade is only visible when this is true
			},
			24: {
				title: "Gluon Upgrade 24",
                description: "Neutrinos boost Incrementy gain.",
                cost: new Decimal(1e126),
				effect() {
                    let ret = player.incrementy_n.points.add(1);
                    return ret;
				},
                unlocked() { return player.tm.buyables[5].gte(15); }, // The upgrade is only visible when this is true
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			25: {
				title: "Gluon Upgrade 25",
                description: "Gluon Upgrade 14 is squared.",
                cost: new Decimal(1e127),
                unlocked() { return player.tm.buyables[5].gte(15); }, // The upgrade is only visible when this is true
			},
			31: {
				title: "Gluon Upgrade 31",
                description: "Gluon Upgrade 13 is squared.",
                cost: new Decimal(1e296),
                unlocked() { return player.incrementy_q.challenges[12]; }, // The upgrade is only visible when this is true
			},
			32: {
				title: "Gluon Upgrade 32",
                description: "Gluon Upgrade 14's effect ^1.1",
                cost: new Decimal("1e390"),
                unlocked() { return player.incrementy_q.challenges[12]; }, // The upgrade is only visible when this is true
			},
			33: {
				title: "Gluon Upgrade 33",
                description: "Gluon Upgrade 15's effect ^1.5",
                cost: new Decimal("1e509"),
                unlocked() { return player.incrementy_q.challenges[12]; }, // The upgrade is only visible when this is true
			},
			34: {
				title: "Gluon Upgrade 34",
                description: "Gluons boost Gluon gain exponent.",
                cost: new Decimal("1e538"),
				effect() {
                    let ret = player.incrementy_g.points.add(1).log10().add(1).log10().pow(0.2).mul(0.04).add(1);
                    return ret;
				},
                unlocked() { return player.incrementy_q.challenges[12]; }, // The upgrade is only visible when this is true
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			35: {
				title: "Gluon Upgrade 35",
                description: "Gluons cheapens Phantom Souls in The Prestige Tree Classic.",
                cost: new Decimal("1e600"),
				effect() {
                    let base=1e30;
                    let ret = Decimal.pow(base,Decimal.log10(player.incrementy_g.points.add(1)).pow(0.9));
                    return ret;
				},
                unlocked() { return player.incrementy_q.challenges[12]; }, // The upgrade is only visible when this is true
				effectDisplay() { return "/"+format(this.effect()) }, // Add formatting to the effect
			},
	 },
});


addLayer("incrementy_q", {
    name: "incrementy_q", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Q", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#A40130",
    requires(){
		if(player.incrementy_sp.best.gte(3))return new Decimal(1);
		return new Decimal("1e500");
	},
    resource: "Quarks", // Name of prestige currency
    baseResource: "Particles", // Name of resource prestige is based on
    baseAmount() {return player.incrementy_p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {
        ret = new Decimal(0.5)
		if(hasUpgrade("incrementy_s",35))ret = ret.mul(2)
        return ret
    },
	gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(hasUpgrade("incrementy_p",32))mult = mult.mul(buyableEffect("incrementy_p",12));
		return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(16) && (!player.incrementy_pi.hidelayers);},
		doReset(l){
			if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_q",["upgrades","milestones","challenges"]);
			return;
		},
		
	 resetsNothing: true,
	passiveGeneration(){
		if(player.incrementy_sp.best.gte(3)&&hasUpgrade("incrementy_q",11))return 1e4;
		if(hasUpgrade("incrementy_s",11)&&hasUpgrade("incrementy_q",11))return 100;
		if(hasUpgrade("incrementy_q",11))return 1;
		return 0;
	},
	
	 upgrades: {
            rows: 2,
            cols: 5,
			11: {
				title: "Quark Upgrade 11",
                description(){return "Gain "+(player.incrementy_sp.best.gte(3)?"1e6":hasUpgrade("incrementy_s",11)?10000:100)+"% of Quark gain per second."},
                cost: new Decimal(15),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			12: {
				title: "Quark Upgrade 12",
                description: "Unlock a quark challenge.",
                cost: new Decimal(1e10),
                unlocked() { return player.tm.buyables[5].gte(17); }, // The upgrade is only visible when this is true
			},
			13: {
				title: "Quark Upgrade 13",
                description: "Unlock a quark challenge.",
                cost: new Decimal(1e35),
                unlocked() { return player.tm.buyables[5].gte(17); }, // The upgrade is only visible when this is true
			},
			14: {
				title: "Quark Upgrade 14",
                description: "Quarks boost Prestige Point gain in The Prestige Tree Classic.",
                cost: new Decimal(1e190),
				effect() {
                    let ret = Decimal.log10(player.incrementy_q.points.add(1)).pow(2e4);
					if(player.incrementy_q.points.gte("1e5000"))ret = player.incrementy_q.points.pow(55);
                    return ret;
				},
                unlocked() { return player.tm.buyables[5].gte(17); }, // The upgrade is only visible when this is true
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			15: {
				title: "Quark Upgrade 15",
                description: "Unlock a quark challenge.",
                cost: new Decimal(1e192),
                unlocked() { return player.tm.buyables[5].gte(18); }, // The upgrade is only visible when this is true
			},
	 },
	 
        challenges: {
                rows: 2,
                cols: 2,
                11: {
                        name: "Son",
                        challengeDescription: "Square root Incrementy gain",
                        rewardDescription: "Unlock some Incrementy Upgrades",
                        unlocked(){
                                return hasUpgrade("incrementy_q",12);
                        },
                        currencyDisplayName: "incrementy",
                        currencyInternalName: "5",
                        currencyLayer: "modpoints",
                        goal(){
                                let exp = layers.incrementy_q.getChallGoalExp()
                                return Decimal.pow(10, 50000).pow(exp)
                        },
                },
                12: {
                        name: "Sun",
                        challengeDescription: "Cube root Incrementy gain",
                        rewardDescription: "Unlock some Gluon Upgrades",
                        unlocked(){
                                return hasUpgrade("incrementy_q",13);
                        },
                        currencyDisplayName: "incrementy",
                        currencyInternalName: "5",
                        currencyLayer: "modpoints",
                        goal(){
                                let exp = layers.incrementy_q.getChallGoalExp()
                                return Decimal.pow(10, 37800).pow(exp)
                        },
                },
                21: {
                        name: "Pole",
                        challengeDescription: "Fifth root Incrementy gain",
                        rewardDescription: "Unlock some Antimatter Upgrades",
                        unlocked(){
                                return hasUpgrade("incrementy_q",15);
                        },
                        currencyDisplayName: "incrementy",
                        currencyInternalName: "5",
                        currencyLayer: "modpoints",
                        goal(){
                                let exp = layers.incrementy_q.getChallGoalExp()
                                return Decimal.pow(10, 28838).pow(exp)
                        },
                },
                22: {
                        name: "Poll",
                        challengeDescription: "Fourth root Incrementy gain",
                        rewardDescription: "Unlock some Particle Upgrades",
                        unlocked(){
                                return hasUpgrade("incrementy_am",34);
                        },
                        currencyDisplayName: "incrementy",
                        currencyInternalName: "5",
                        currencyLayer: "modpoints",
                        goal(){
                                let exp = layers.incrementy_q.getChallGoalExp()
                                return Decimal.pow(10, 44000).pow(exp)
                        },
                },
		},
		
        getChallGoalExp(){
                let q = player.incrementy_q.points
                if (q.gt(100)) q = q.log10().times(50)
                if (q.gt(1e4)) q = q.log10().times(2.5).pow(4)
                if (q.gt(1e10)) q = q.log10().pow(10)
                return q.plus(10).log10().plus(9).log10().pow(-1)
        },
});


addLayer("incrementy_s", {
    name: "incrementy_s", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#1346DF",
    requires(){
		if(player.incrementy_sp.best.gte(8))return new Decimal(1);
		return new Decimal("1e1450");
	},
    resource: "Shards", // Name of prestige currency
    baseResource: "particles", // Name of resource prestige is based on
    baseAmount() {return player.incrementy_p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(layers.incrementy_sp.challenges[12].rewardEffect());
		if(hasUpgrade("incrementy_s",31))mult=mult.mul(upgradeEffect("incrementy_s",31));
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    branches: ["incrementy_p"],
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(19)},
		doReset(l){
			if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || l=="incrementy_n" || l=="incrementy_g" || l=="incrementy_q" || l=="incrementy_p" ||  l=="incrementy_s" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_s",["upgrades","milestones","challenges"]);
			return;
		},
	getResetGain() {
		let ret=player.incrementy_p.points;
		if(hasUpgrade("incrementy_sp",12)){
			ret=Decimal.pow(10,ret.add(10).log10().pow(hasUpgrade("incrementy_sp",14)?0.3:0.25)).mul(tmp.incrementy_s.gainMult).floor();
			return ret;
		}
		if(player.incrementy_sp.best.gte(8))return ret.add(10).log10().pow(hasUpgrade("incrementy_s",41)?2:1).mul(tmp.incrementy_s.gainMult).floor();
		if(ret.lt("1e1450"))return new Decimal(0);
		if(hasUpgrade("incrementy_b",15))ret = ret.log10().pow(hasUpgrade("incrementy_s",41)?2:1).mul(tmp.incrementy_s.gainMult).floor();
		else ret=ret.div("1e1440").log10().div(10).pow(0.5).mul(tmp.incrementy_s.gainMult).floor();
		return ret;
	},
	getNextAt() {
		let ret=tmp.incrementy_s.getResetGain.plus(1);
		ret=ret.div(tmp.incrementy_s.gainMult);
		if(hasUpgrade("incrementy_sp",12)){
			ret=Decimal.pow(10,ret.log10().pow(hasUpgrade("incrementy_sp",14)?(10/3):4));
			return ret;
		}
		if(hasUpgrade("incrementy_b",15)||player.incrementy_sp.best.gte(8)){
			ret=Decimal.pow(10,ret.pow(1/(hasUpgrade("incrementy_s",41)?2:1)));
			return ret;
		}
		ret=ret.pow(2).mul(10);
		ret=Decimal.pow(10,ret).mul("1e1440");
		return ret;
	},
        effect(){
				if(!player.incrementy_s.unlocked)return new Decimal(1);
                let eff1 = player.incrementy_s.points.add(1).pow(10).max(10000);
                return eff1
        },
        effectDescription(){
                let eff = layers.incrementy_s.effect()
                return "which multiplies "+(hasUpgrade("incrementy_s",32)?"base ":"")+"incrementy gain by " + format(eff) + (player.incrementy_s.best.lt(100)?". The effect is always at least 10,000 once you have Shard reset once":"")
        },
		
	 upgrades: {
            rows: 4,
            cols: 5,
			11: {
				title: "Shard Upgrade 11",
                description: "Autobuy Neutrino Buyables. 100x to Particle/Neutrino/ Gluon/Quark Upgrades 11.",
                cost: new Decimal(1),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			12: {
				title: "Shard Upgrade 12",
                description: "Autobuy Particle Buyables. +0.9 to Neutrino Generation base.",
                cost: new Decimal(3),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			13: {
				title: "Shard Upgrade 13",
                description: "Shard Upgrades add to all neutrino buyables.",
                cost: new Decimal(10),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			14: {
				title: "Shard Upgrade 14",
                description: "Particle Collision add to second column of neutrino buyables.",
                cost: new Decimal(30),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			15: {
				title: "Shard Upgrade 15",
                description: "Particle Simulation add to third column of neutrino buyables.",
                cost: new Decimal(100),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			21: {
				title: "Shard Upgrade 21",
                description: "Shard Upgrades add to all Particle Buyables.",
                cost: new Decimal(20),
                unlocked() { return player.tm.buyables[5].gte(20); }, // The upgrade is only visible when this is true
			},
			22: {
				title: "Shard Upgrade 22",
                description: "Particle Collision add to Particle Acceleration.",
                cost: new Decimal(60),
                unlocked() { return player.tm.buyables[5].gte(20); }, // The upgrade is only visible when this is true
			},
			23: {
				title: "Shard Upgrade 23",
                description: "Particle Simulation add to Particle Collision.",
                cost: new Decimal(150),
                unlocked() { return player.tm.buyables[5].gte(20); }, // The upgrade is only visible when this is true
			},
			24: {
				title: "Shard Upgrade 24",
                description: "Incrementy Stamina softcap starts 5 later (55 -> 60)",
                cost: new Decimal(200),
                unlocked() { return player.tm.buyables[5].gte(20); }, // The upgrade is only visible when this is true
			},
			25: {
				title: "Shard Upgrade 25",
                description(){return  "Gain "+(player.incrementy_sp.best.gte(8)?1e6:100)+"% of Shard Gain per second."},
                cost: new Decimal(300),
                unlocked() { return player.tm.buyables[5].gte(20); }, // The upgrade is only visible when this is true
			},
			31: {
				title: "Shard Upgrade 31",
                description: "Each Boson Challenge completion double Shard gain.",
                cost: new Decimal(2e6),
				effect() {
                    let ret = Decimal.pow(2,layers.incrementy_b.getBChallengeTotal());
                    return ret;
				},
                unlocked() { return player.tm.buyables[5].gte(21); }, // The upgrade is only visible when this is true
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			32: {
				title: "Shard Upgrade 32",
                description: "Shard effect is applied before Incrementy Stamina",
                cost: new Decimal(2e7),
                unlocked() { return player.tm.buyables[5].gte(21); }, // The upgrade is only visible when this is true
			},
			33: {
				title: "Shard Upgrade 33",
                description: "Boson gain is better.",
                cost: new Decimal(6e7),
                unlocked() { return player.tm.buyables[5].gte(21); }, // The upgrade is only visible when this is true
			},
			34: {
				title: "Shard Upgrade 34",
                description: "Incrementy Stamina softcap starts 1 later (60 -> 61)",
                cost: new Decimal(1.5e8),
                unlocked() { return player.tm.buyables[5].gte(21); }, // The upgrade is only visible when this is true
			},
			35: {
				title: "Shard Upgrade 35",
                description: "Square base Quark gain",
                cost: new Decimal(5e8),
                unlocked() { return player.tm.buyables[5].gte(21); }, // The upgrade is only visible when this is true
			},
			41: {
				title: "Shard Upgrade 41",
                description: "Shard gain is better.",
                cost: new Decimal(1e13),
                unlocked() { return player.tm.buyables[5].gte(25); }, // The upgrade is only visible when this is true
			},
			42: {
				title: "Shard Upgrade 42",
                description: "Reduce Boson challenge goals.",
                cost: new Decimal(5e19),
                unlocked() { return player.tm.buyables[5].gte(25); }, // The upgrade is only visible when this is true
			},
			43: {
				title: "Shard Upgrade 43",
                description: "Antimatter gain is better.",
                cost: new Decimal(2e20),
                unlocked() { return player.tm.buyables[5].gte(25); }, // The upgrade is only visible when this is true
			},
			44: {
				title: "Shard Upgrade 44",
                description: "Reduce Boson challenge goals.",
                cost: new Decimal(2e20),
                unlocked() { return player.tm.buyables[5].gte(26); }, // The upgrade is only visible when this is true
			},
			45: {
				title: "Shard Upgrade 45",
                description: "Reduce Boson challenge goals.",
                cost: new Decimal(2e20),
                unlocked() { return player.tm.buyables[5].gte(27); }, // The upgrade is only visible when this is true
			},
	 },
	passiveGeneration(){
		if(player.incrementy_sp.best.gte(8)&&hasUpgrade("incrementy_s",25))return 1e4;
		if(hasUpgrade("incrementy_s",25))return 1;
		return 0;
	}
});



addLayer("incrementy_b", {
    name: "incrementy_b", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#D346DF",
    requires(){
		if(player.incrementy_sp.best.gte(5))return new Decimal(1);
		return new Decimal("1e4000");
	},
    resource: "Bosons", // Name of prestige currency
    baseResource: "particles", // Name of resource prestige is based on
    baseAmount() {return player.incrementy_p.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(hasUpgrade("incrementy_b",14))mult=mult.mul(upgradeEffect("incrementy_b",14));
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	getResetGain() {
		let ret=player.incrementy_p.points;
		if(hasUpgrade("incrementy_sp",12)){
			ret=Decimal.pow(10,ret.add(10).log10().pow(hasMilestone("incrementy_o",5)?0.43:hasUpgrade("incrementy_sp",14)?0.4:0.3)).mul(tmp.incrementy_b.gainMult).floor();
			return ret;
		}
		if(player.incrementy_sp.best.gte(5)){
			ret=ret.add(10).log10().div(2).pow(hasUpgrade("incrementy_s",33)?2:1.5).mul(tmp.incrementy_b.gainMult).floor();
			return ret;
		}
		if(ret.lt("1e4000"))return new Decimal(0);
		ret=ret.div("1e3900").log10().div(2).pow(hasUpgrade("incrementy_s",33)?2:1.5).mul(tmp.incrementy_b.gainMult).floor();
		return ret;
	},
	getNextAt() {
		let ret=tmp.incrementy_b.getResetGain.plus(1);
		ret=ret.div(tmp.incrementy_b.gainMult);
		if(hasUpgrade("incrementy_sp",12)){
			ret=Decimal.pow(10,ret.log10().pow(10/(hasMilestone("incrementy_o",5)?4.3:hasUpgrade("incrementy_sp",14)?4:3)));
			return ret;
		}
		ret=ret.pow(1/(hasUpgrade("incrementy_s",33)?2:1.5)).mul(2);
		if(player.incrementy_sp.best.gte(5)){
			ret=Decimal.pow(10,ret);
		}else ret=Decimal.pow(10,ret).mul("1e3900");
		return ret;
	},
    branches: ["incrementy_p", "incrementy_g", "incrementy_q"],
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(21) && (!player.incrementy_pi.hidelayers)},
		doReset(l){
			if(l=="incrementy_i" || l=="incrementy_b" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_b",["upgrades","milestones","challenges"]);
			return;
		},
        upgrades: {
                rows: 3,
                cols: 5, 
			11: {
				title: "Boson Upgrade 11",
                description(){return "Gain "+(player.incrementy_sp.best.gte(5)?1e6:100)+"% of Boson gain per second."},
                cost: new Decimal(15),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			12: {
				title: "Boson Upgrade 12",
                description: "Unlock a Boson Challenge.",
                cost: new Decimal(50000),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			13: {
				title: "Boson Upgrade 13",
                description: "Uncap Incrementy Upgrade 31.",
                cost: new Decimal(500000),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			14: {
				title: "Boson Upgrade 14",
                description: "Each Boson Challenge completion double Boson gain.",
                cost: new Decimal(1500000),
				effect() {
                    let ret = Decimal.pow(2,layers.incrementy_b.getBChallengeTotal());
                    return ret;
				},
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			15: {
				title: "Boson Upgrade 15",
                description: "Unlock a Boson Challenge, and Shard gain is better.",
                cost: new Decimal(1e7),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			21: {
				title: "Boson Upgrade 21",
                description(){return "Incrementy Stamina softcap starts 2 later (61 -> 63)"},
                cost: new Decimal(1e10),
                unlocked() { return player.tm.buyables[5].gte(22); }, // The upgrade is only visible when this is true
			},
			22: {
				title: "Boson Upgrade 22",
                description(){return "Incrementy Strength is applied before Incrementy Stamina"},
                cost: new Decimal(3e10),
                unlocked() { return player.tm.buyables[5].gte(22); }, // The upgrade is only visible when this is true
			},
			23: {
				title: "Boson Upgrade 23",
                description(){return "Push the Boson softcap to 20, and unlock the third challenge"},
                cost: new Decimal(3e11),
                unlocked() { return player.tm.buyables[5].gte(22); }, // The upgrade is only visible when this is true
			},
			24: {
				title: "Boson Upgrade 24",
                description(){return "Antimatter gain formula is better."},
                cost: new Decimal(3e12),
                unlocked() { return player.tm.buyables[5].gte(22); }, // The upgrade is only visible when this is true
			},
			25: {
				title: "Boson Upgrade 25",
                description(){return "Incrementy Stamina softcap starts 2 later (63 -> 65)"},
                cost: new Decimal(1e13),
                unlocked() { return player.tm.buyables[5].gte(22); }, // The upgrade is only visible when this is true
			},
			31: {
				title: "Boson Upgrade 31",
                description(){return "Boson Upgrades add to all Particle Buyables."},
                cost: new Decimal(1e14),
                unlocked() { return player.tm.buyables[5].gte(23); }, // The upgrade is only visible when this is true
			},
			32: {
				title: "Boson Upgrade 32",
                description(){return "Unlock the final Boson Challenge."},
                cost: new Decimal(2e15),
                unlocked() { return player.tm.buyables[5].gte(23); }, // The upgrade is only visible when this is true
			},
			33: {
				title: "Boson Upgrade 33",
                description(){return "Boson challenge 1 completions add to all Particle Buyables."},
                cost: new Decimal(1e18),
                unlocked() { return player.tm.buyables[5].gte(24); }, // The upgrade is only visible when this is true
			},
			34: {
				title: "Boson Upgrade 34",
                description(){return "Boson challenge 2-4 completions add to all Particle Buyables."},
                cost: new Decimal(3e18),
                unlocked() { return player.tm.buyables[5].gte(24); }, // The upgrade is only visible when this is true
			},
			35: {
				title: "Boson Upgrade 35",
                description(){return "Incrementy Stamina softcap starts 5 later (65 -> 70)"},
                cost: new Decimal(1e19),
                unlocked() { return player.tm.buyables[5].gte(24); }, // The upgrade is only visible when this is true
			},
		},
	passiveGeneration(){
		if(player.incrementy_sp.best.gte(5)&&hasUpgrade("incrementy_b",11))return 1e4;
		if(hasUpgrade("incrementy_b",11))return 1;
		return 0;
	},
	resetsNothing: true,
        effect(){
                let amt = player.incrementy_b.points
                let ret = amt.times(9).plus(1).log10()
				if(hasUpgrade("incrementy_sp",23))return ret;
                if (hasUpgrade("incrementy_b", 23)) {
                        if (ret.gt(20)) ret = ret.times(5).log10().pow(4).times(1.25)
                } else if (ret.gt(10)) ret = ret.log10().times(10)

                return ret
        },
        effectDescription(){
                let a = "which multiplies "+(hasUpgrade("incrementy_pi",24)?"Base ":"")+"Incrementy gain by Amoebas ^" + format(layers.incrementy_b.effect().div(hasUpgrade("incrementy_pi",24)?9:1)) + "."
                return a 
        },
		
        tabFormat: [
                                "main-display", "prestige-button", "resource-display",
                                ["display-text", "Starting challenges resets Bosons and Incrementy."],
                                 "upgrades","challenges"
                        ],
						
						getBChallengeTotal(){
        return challengeCompletions("incrementy_b", 11) + challengeCompletions("incrementy_b", 12) + challengeCompletions("incrementy_b", 21) + challengeCompletions("incrementy_b", 22);
},
        challenges:{
                rows: 2,
                cols: 2,
                11: {
                        name: "Been", 
                        challengeDescription: "Incrementy Stamina effect is linear instead of exponential",
                        rewardDescription: "Add to the base of Incrementy Strength and Neutrino generation based on total Boson Challenge completions",
                        rewardEffect(){
                                let tot = new Decimal(layers.incrementy_b.getBChallengeTotal() + 1)
                                let comps = challengeCompletions("incrementy_b", 11)

								if (tot.gt(3) && !hasUpgrade("incrementy_sp", 15)) tot = tot.log(3).plus(2)
								if (tot.gt(4) && !hasUpgrade("incrementy_sp", 15)) tot = tot.log(4).plus(3)
									
                                if (comps >= 4 && !hasUpgrade("incrementy_sp", 15)) comps = Math.log10(comps * 33 + 1) + 1

                                let ret = Decimal.pow(tot, comps).minus(1)

                                if (ret.gt(50)) ret = ret.times(2).log10().times(25)

                                return ret
                        },
                        rewardDisplay(){
                                let comps = "Because you have " + formatWhole(challengeCompletions("incrementy_b", 11)) + "/"+layers.incrementy_b.challenges[22].completionLimit()+" challenge completions, "
                                let eff = "add " + format(layers.incrementy_b.challenges[11].rewardEffect()) + " to the base."
                                return comps + eff
                        },
                        unlocked(){
                                return hasUpgrade("incrementy_b",12);
                        },
                        goal(){
                                let comps = challengeCompletions("incrementy_b", 11)
								if(comps>=60)return Decimal.pow(10,(comps**7)/(100-comps));
								if(comps>=40)return Decimal.pow(10,(comps**6)/(60-comps));
								if(comps>=20)return Decimal.pow(10,(comps**5)*2);
								if(hasUpgrade("incrementy_s",42)||comps>=10)return Decimal.pow(10,200000+comps*comps*15000);
                                let base = 286000
                                base += comps * comps * comps * 2000
                                return Decimal.pow(10, base)
                        },
                        currencyDisplayName: "incrementy",
                        currencyInternalName: "5",
                        currencyLayer: "modpoints",
                        completionLimit(){
							let ret=10;
							if(hasUpgrade("incrementy_sp",11))ret+=(player.incrementy_sp.upgrades||[]).length;
							if(hasUpgrade("incrementy_sp",11)&&hasUpgrade("incrementy_sp",31))ret+=(player.incrementy_sp.upgrades||[]).length;
							if(hasMilestone("incrementy_o",5))ret+=10;
							if(hasUpgrade("incrementy_o",21))ret+=(player.incrementy_o.upgrades||[]).length;
							return ret;
						},
                },
                12: {
                        name: "Bin", 
                        challengeDescription() {
                                return "Base Incrementy Gain buyable base is raised to the " + format(new Decimal(2).div(3 + challengeCompletions("incrementy_b", 12)), 3)
                        },
                        rewardDescription: "Incrementy Stamina gives free levels to Incrementy Speed",
                        rewardEffect(){
                                let comps = challengeCompletions("incrementy_b", 12)

                                let ret = Decimal.pow(comps + 8, 1.5).times(2)

                                if (comps == 0) ret = new Decimal(0)

                                return ret
                        },
                        rewardDisplay(){
                                let comps = "Because you have " + formatWhole(challengeCompletions("incrementy_b", 12)) + "/"+layers.incrementy_b.challenges[22].completionLimit()+" challenge completions, "
                                let eff = "you get " + format(layers.incrementy_b.challenges[12].rewardEffect()) + " free Speed levels per Stamina."
                                return comps + eff
                        },
                        unlocked(){
                                return hasUpgrade("incrementy_b",15);
                        },
                        goal(){
                                let comps = challengeCompletions("incrementy_b", 12)
								if(comps>=60)return Decimal.pow(10,(comps**7)/(100-comps));
								if(comps>=40)return Decimal.pow(10,(comps**6)/(60-comps));
								if(comps>=20)return Decimal.pow(10,(comps**5)*2);
								if(hasUpgrade("incrementy_s",42)||comps>=10)return Decimal.pow(10,200000+comps*comps*15000);
                                let base = 614000
                                base += comps * 22000
								if (comps >= 3)base += (comps-2) * (comps-2) * 12500
                                return Decimal.pow(10, base)
                        },
                        currencyDisplayName: "incrementy",
                        currencyInternalName: "5",
                        currencyLayer: "modpoints",
                        completionLimit(){
							let ret=10;
							if(hasUpgrade("incrementy_sp",11))ret+=(player.incrementy_sp.upgrades||[]).length;
							if(hasUpgrade("incrementy_sp",11)&&hasUpgrade("incrementy_sp",31))ret+=(player.incrementy_sp.upgrades||[]).length;
							if(hasMilestone("incrementy_o",5))ret+=10;
							if(hasUpgrade("incrementy_o",21))ret+=(player.incrementy_o.upgrades||[]).length;
							return ret;
						},
                },
                21: {
                        name: "Band", 
                        challengeDescription: "Base Incrementy Gain buyable effect base is 1",
                        rewardDescription: "Log10 of your Quarks raised to a power boosts Amoeba gain",
                        rewardEffect(){
                                let comps = challengeCompletions("incrementy_b", 21)

                                let ret = Decimal.pow(comps * 5 + 11, 1.5)

                                if (comps == 0) ret = new Decimal(0)

                                return ret
                        },
                        rewardDisplay(){
                                let comps = "Because you have " + formatWhole(challengeCompletions("incrementy_b", 21)) + "/"+layers.incrementy_b.challenges[22].completionLimit()+" challenge completions, "
                                let eff = "you get a log(Quarks)^" + format(layers.incrementy_b.challenges[21].rewardEffect()) + " multiplier to Amoeba gain."
                                return comps + eff
                        },
                        unlocked(){
                                return hasUpgrade("incrementy_b",23);
                        },
                        goal(){
                                let comps = challengeCompletions("incrementy_b", 21)
								if(comps>=60)return Decimal.pow(10,(comps**7)/(100-comps));
								if(comps>=40)return Decimal.pow(10,(comps**6)/(60-comps));
								if(comps>=20)return Decimal.pow(10,(comps**5)*2);
								if(hasUpgrade("incrementy_s",42)||comps>=10)return Decimal.pow(10,200000+comps*comps*15000);
                                let base = 926000
                                base += comps * 66000
								if (comps >= 5)base += (comps-4) * (comps-4) * 25000
                                return Decimal.pow(10, base)
                        },
                        currencyDisplayName: "incrementy",
                        currencyInternalName: "5",
                        currencyLayer: "modpoints",
                        completionLimit(){
							let ret=10;
							if(hasUpgrade("incrementy_sp",11))ret+=(player.incrementy_sp.upgrades||[]).length;
							if(hasUpgrade("incrementy_sp",11)&&hasUpgrade("incrementy_sp",31))ret+=(player.incrementy_sp.upgrades||[]).length;
							if(hasMilestone("incrementy_o",5))ret+=10;
							if(hasUpgrade("incrementy_o",21))ret+=(player.incrementy_o.upgrades||[]).length;
							return ret;
						},
                },
                22: {
                        name: "Banned", 
                        challengeDescription: "Be in all 3 prior Challenges at Once",
                        rewardDescription: "Add to the Particle Generation base, and get extra Particle Simulation levels",
                        rewardEffect(){
                                let comps = challengeCompletions("incrementy_b", 22)

                                let ret = Decimal.pow(comps, 2).plus(comps).sub(1);

                                if (comps == 0) ret = new Decimal(0)

                                return [ret, comps * (comps + 3) / 2 + comps * 4]
                        },
                        rewardDisplay(){
                                let comps = "Because you have " + formatWhole(challengeCompletions("incrementy_b", 22)) + "/"+layers.incrementy_b.challenges[22].completionLimit()+" challenge completions, "
                                let eff = "you get +" + format(layers.incrementy_b.challenges[22].rewardEffect()[0]) + " to the Particle Generation base and "
                                let eff2 =  formatWhole(layers.incrementy_b.challenges[22].rewardEffect()[1]) + " extra Particle Simulation levels."
                                return comps + eff + eff2
                        },
                        unlocked(){
                                return hasUpgrade("incrementy_b",32);
                        },
                        goal(){
                                let comps = challengeCompletions("incrementy_b", 22)
								if(comps>=60)return Decimal.pow(10,(comps**7)/(100-comps));
								if(comps>=40)return Decimal.pow(10,(comps**6)/(60-comps));
								if(comps>=20)return Decimal.pow(10,(comps**5)*2);
								if(hasUpgrade("incrementy_s",45)||comps>=10)return Decimal.pow(10,200000+comps*comps*15000);
								if(hasUpgrade("incrementy_s",44))return Decimal.pow(10,890000+comps*comps*15000);
								if(hasUpgrade("incrementy_s",42))return Decimal.pow(10,1000000+comps*comps*15000);
                                let base = 624000
                                base += comps ** 2 * 20000
                                base += comps * 66000
                                return Decimal.pow(10, base)
                        },
                        currencyDisplayName: "incrementy",
                        currencyInternalName: "5",
                        currencyLayer: "modpoints",
                        completionLimit(){
							let ret=10;
							if(hasUpgrade("incrementy_sp",11))ret+=(player.incrementy_sp.upgrades||[]).length;
							if(hasUpgrade("incrementy_sp",11)&&hasUpgrade("incrementy_sp",31))ret+=(player.incrementy_sp.upgrades||[]).length;
							if(hasMilestone("incrementy_o",5))ret+=10;
							if(hasUpgrade("incrementy_o",21))ret+=(player.incrementy_o.upgrades||[]).length;
							return ret;
						},
                        countsAs: [11, 12, 21],
                },
		},
});



addLayer("incrementy_sp", {
        name: "incrementy_sp",
        symbol: "SP", 
        position: 2,
        startData() { return {
               unlocked: true,
		      points: new Decimal(0),
                chall1points: new Decimal(0),
                chall2points: new Decimal(0),
                chall3points: new Decimal(0),
                chall4points: new Decimal(0),
        }},
        color: "#1CA2E8",
        requires: new Decimal(1e20), 
        resource: "Super Prestige Points",
    baseResource: "Shards", // Name of resource prestige is based on
        baseAmount() {return player.incrementy_s.points}, 
        branches: ["incrementy_s"],
        type: "normal", 
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        mult = mult.times(layers.incrementy_sp.challenges[11].rewardEffect());
		if(player.milestone_m.best.gte(5))mult = mult.mul(tmp.milestone_m.milestone5Effect);
		if(hasUpgrade("incrementy_sp",51))mult=mult.mul(upgradeEffect("incrementy_sp",51));
		if(hasUpgrade("incrementy_a",35))mult=mult.mul(upgradeEffect("incrementy_a",35));
		if(hasUpgrade("incrementy_m",35))mult=mult.mul(upgradeEffect("incrementy_m",35));
		if(hasUpgrade("incrementy_pi",11))mult=mult.mul(upgradeEffect("incrementy_pi",11));
        mult = mult.times(layers.incrementy_o.effect());
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	getResetGain() {
		let ret=player.incrementy_s.points;
		if(ret.lt("1e20"))return new Decimal(0);
		if(hasUpgrade("incrementy_pi",22)){
			ret=Decimal.pow(10,ret.add(10).log10().pow(0.4)).mul(tmp.incrementy_sp.gainMult).floor();
			return ret;
		}
		ret=ret.log10().div(20).pow(2).mul(tmp.incrementy_sp.gainMult).floor();
		return ret;
	},
	getNextAt() {
		let ret=tmp.incrementy_sp.getResetGain.plus(1);
		ret=ret.div(tmp.incrementy_sp.gainMult);
		if(hasUpgrade("incrementy_pi",22)){
			ret=Decimal.pow(10,ret.log10().pow(10/4));
			return ret;
		}
		ret=ret.pow(1/(2)).mul(20);
		ret=Decimal.pow(10,ret);
		return ret;
	},
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(28)},
		doReset(l){
			if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || l=="incrementy_n" || l=="incrementy_g" || l=="incrementy_q" || l=="incrementy_p" ||  l=="incrementy_s" || l=="incrementy_sp" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_sp",["upgrades","milestones","challenges","chall1points","chall2points","chall3points","chall4points"]);
			return;
		},
        effect(){
				if(player.tm.buyables[5].lte(28))return new Decimal(0);
                let amt = player.incrementy_sp.points
                let ret = amt.add(10).log10().mul(Decimal.pow(1.1,player.tm.buyables[5])).div(5);
				if(ret.gte(20))ret = ret.div(20).sqrt().mul(20);
				if(ret.gte(84))ret = ret.add(16).log10().mul(42);
                return ret
        },
        effectDescription(){
                let a = "which increases the Incrementy Stamina softcap by " + format(layers.incrementy_sp.effect()) + " (boosted by the level of this tree)";
                return a 
        },
        milestones: {
                1: {
                        requirementDescription: "<b>Toad</b><br>Requires: 2 Super Prestige Points", 
                        effectDescription: "AM/A/M/E requirements are 1. 1e4x to AM/A passive gain, and 100x to M/E passive gain.",
                        done(){
                                return player.incrementy_sp.best.gte(2)
                        },
                },
                2: {
                        requirementDescription: "<b>Toed</b><br>Requires: 3 Super Prestige Points", 
                        effectDescription: "P/N/G/Q requirements are 1. 100x to P/N/G/Q passive gain.",
                        done(){
                                return player.incrementy_sp.best.gte(3)
                        },
                },
                3: {
                        requirementDescription: "<b>Towed</b><br>Requires: 5 Super Prestige Points", 
                        effectDescription: "Boson requirement is 1. 1e4x to Boson passive gain.",
                        done(){
                                return player.incrementy_sp.best.gte(5)
                        },
                },
                4: {
                        requirementDescription: "<b>Wait</b><br>Requires: 8 Super Prestige Points", 
                        effectDescription: "Shard requirement is 1. 1e4x to Shard passive gain.",
                        done(){
                                return player.incrementy_sp.best.gte(8)
                        },
                },
                5: {
                        requirementDescription: "<b>Weight</b><br>Requires: 13 Super Prestige Points", 
                        effectDescription: "Incrementy Upgrade 13 is better",
                        done(){
                                return player.incrementy_sp.best.gte(13)
                        },
                },
		},
        challenges:{
                rows: 2,
                cols: 2,
                11: {
                        name: "Quartz", 
                        challengeDescription: "All Neutrino Buyable bases are set to 1",
                        rewardDescription: "Challenge Points boost Super Prestige Point gain<br>",
                        rewardEffect(){
                                let comps = challengeCompletions("incrementy_sp", 11)
                                
                                let pts = player.incrementy_sp.chall1points

                                let exp = Decimal.div(5, 11-Math.sqrt(comps))
                                if (hasUpgrade("incrementy_sp", 43)) exp = exp.times(2)

                                return Decimal.pow(pts.plus(1), exp)
                        },
                        rewardDisplay(){
                                let comps = "Because you have " + formatWhole(player.incrementy_sp.chall1points) + " Challenge Points "
                                comps += "and " + formatWhole(challengeCompletions("incrementy_sp", 11)) + "/100 Challenge completions, "
                                let eff = "you get " + format(layers.incrementy_sp.challenges[11].rewardEffect()) + "x Super Prestige Points."
                                return comps + eff
                        },
                        unlocked(){
                                return player.tm.buyables[5].gte(29);
                        },
                        goal(initial = false){
                                let comps = challengeCompletions("incrementy_sp", 11)
                                let init = hasUpgrade("incrementy_pi", 44) ? 1 : hasUpgrade("incrementy_sp", 41) ? 20 : 21
                                let exp = initial ? init : init + comps
                                return Decimal.pow(10, Decimal.pow(2, exp))
                        },
                        currencyDisplayName: "incrementy",
                        currencyInternalName: "5",
                        currencyLayer: "modpoints",
                        completionLimit: 100,
                },
                12: {
                        name: "Quarts", 
                        challengeDescription: "Neutrino gain is raised to the .01",
                        rewardDescription: "Challenge Points boost Shard Gain<br>",
                        rewardEffect(){
                                let comps = challengeCompletions("incrementy_sp", 12)
                                
                                let pts = player.incrementy_sp.chall2points

                                let exp = pts.sqrt().min(10 + comps * 3);
								if(hasUpgrade("incrementy_pi", 45))exp = new Decimal(10 + comps * 3);

                                let ret = Decimal.pow(pts.plus(1), exp)     

								if(hasUpgrade("incrementy_pi", 45))return ret;
                                ret = ret.log10().add(1);
                                return ret                           
                        },
                        rewardDisplay(){
                                let comps = "Because you have " + formatWhole(player.incrementy_sp.chall2points) + " Challenge Points "
                                comps += "and " + formatWhole(challengeCompletions("incrementy_sp", 12)) + "/100 Challenge completions, "
                                let eff = "you get " + format(layers.incrementy_sp.challenges[12].rewardEffect()) + "x Shard gain."
                                return comps + eff
                        },
                        unlocked(){
                                return hasUpgrade("incrementy_sp", 35);
                        },
                        goal(initial = false){
                                let comps = challengeCompletions("incrementy_sp", 12)
                                let init = hasUpgrade("incrementy_pi", 44) ? 1 : hasUpgrade("incrementy_sp", 41) ? 27 : 31
                                let exp = initial ? init : init + comps
                                return Decimal.pow(10, Decimal.pow(2, exp))
                        },
                        currencyDisplayName: "incrementy",
                        currencyInternalName: "5",
                        currencyLayer: "modpoints",
                        completionLimit: 100,
                },
                21: {
                        name: "Jewel", 
                        challengeDescription: "Incrementy Stamina Softcap starts at 1",
                        rewardDescription: "Challenge Points boost Energy to Antimatter Synergy<br>",
                        rewardEffect(){
                                let comps = challengeCompletions("incrementy_sp", 21)

                                if (comps == 0) return new Decimal(1)

                                let pts = player.incrementy_sp.chall3points.div(1000)

                                let effpts = pts.pow(1 - .8/Math.sqrt(comps))
                                let ret = Decimal.minus(Decimal.div(1, effpts.plus(10).log10()), 1).times(-1).add(1)

                                if (hasUpgrade("incrementy_pi", 12)) ret = ret.sub(1).sqrt().add(1)
                                return ret
                        },
                        rewardDisplay(){
                                let comps = "Because you have " + formatWhole(player.incrementy_sp.chall3points) + " Challenge Points, "
                                comps += "and " + formatWhole(challengeCompletions("incrementy_sp", 21)) + "/100 Challenge completions, "
                                let eff = "Energy^" + format(layers.incrementy_sp.challenges[21].rewardEffect().sub(1), 4) + " boosts Antimatter gain."
                                return comps + eff
                        },
                        unlocked(){
                                return player.tm.buyables[5].gte(34);
                        },
                        goal(initial = false){
                                let comps = challengeCompletions("incrementy_sp", 21)
                                let init = hasMilestone("incrementy_o",1) ? 1 : hasUpgrade("incrementy_sp", 41) ? 20 : 21
                                let exp = initial ? init : init + comps
                                return Decimal.pow(10, Decimal.pow(2, exp))
                        },
                        currencyDisplayName: "incrementy",
                        currencyInternalName: "5",
                        currencyLayer: "modpoints",
                        completionLimit: 100,
                },
                22: {
                        name: "Joule", 
                        challengeDescription: "Incrementy gain is raised to the .01",
                        rewardDescription: "Challenge Points boost Particle Boost base<br>",
                        rewardEffect(){
                                let comps = challengeCompletions("incrementy_sp", 22)

                                let pts = player.incrementy_sp.chall4points

                                //if (comps > 5) comps = comps / 4 + 3.75

                                return Decimal.pow(pts.plus(1), comps/10)
                        },
                        rewardDisplay(){
                                let comps = "Because you have " + formatWhole(player.incrementy_sp.chall4points) + " Challenge Points, "
                                comps += "and " + formatWhole(challengeCompletions("incrementy_sp", 22)) + "/100 Challenge completions, "
                                let eff = "you get x" + format(layers.incrementy_sp.challenges[22].rewardEffect()) + " to Particle Boost base."
                                return comps + eff
                        },
                        unlocked(){
                                return player.tm.buyables[5].gte(34);
                        },
                        goal(initial = false){
                                let comps = challengeCompletions("incrementy_sp", 22)
                                let init = hasMilestone("incrementy_o",1) ? 1 : hasUpgrade("incrementy_sp", 41) ? 13 : 14
                                let exp = initial ? init : init + comps
                                return Decimal.pow(10, Decimal.pow(2, exp))
                        },
                        currencyDisplayName: "incrementy",
                        currencyInternalName: "5",
                        currencyLayer: "modpoints",
                        completionLimit: 100,
                },
		},
		update(){
			if (inChallenge("incrementy_sp", 11) || hasUpgrade("incrementy_pi", 35)) {
					let base = layers.incrementy_sp.challenges[11].goal(true)
					let pts = player.modpoints[5]
					let diff = player.modpoints[5].max(10).log(10).max(2).log(2).minus(base.log(10).log(2)).max(0)
					player.incrementy_sp.chall1points=player.incrementy_sp.chall1points.max(diff.plus(1).pow(3).minus(1).times(100).floor());
			}
			if (inChallenge("incrementy_sp", 12) || hasUpgrade("incrementy_pi", 35)) {
					let base = layers.incrementy_sp.challenges[12].goal(true)
					let pts = player.modpoints[5]
					let diff = player.modpoints[5].max(10).log(10).max(2).log(2).minus(base.log(10).log(2)).max(0)
					player.incrementy_sp.chall2points=player.incrementy_sp.chall2points.max(diff.plus(1).pow(3).minus(1).times(100).floor());
			}
			
			if(hasUpgrade("incrementy_pi", 44)){
					let target=player.modpoints[5].max(10).log(10).max(2).log(2);
					player.incrementy_sp.challenges[11]=Math.max(player.incrementy_sp.challenges[11],target.floor().min(100).toNumber());
					player.incrementy_sp.challenges[12]=Math.max(player.incrementy_sp.challenges[12],target.floor().min(100).toNumber());
			}
			
			if (inChallenge("incrementy_sp", 21) || hasMilestone("incrementy_o",3)) {
					let base = layers.incrementy_sp.challenges[21].goal(true)
					let pts = player.modpoints[5]
					let diff = player.modpoints[5].max(10).log(10).max(2).log(2).minus(base.log(10).log(2)).max(0)
					player.incrementy_sp.chall3points=player.incrementy_sp.chall3points.max(diff.plus(1).pow(3).minus(1).times(100).floor());
			}
			if (inChallenge("incrementy_sp", 22) || hasMilestone("incrementy_o",3)) {
					let base = layers.incrementy_sp.challenges[22].goal(true)
					let pts = player.modpoints[5]
					let diff = player.modpoints[5].max(10).log(10).max(2).log(2).minus(base.log(10).log(2)).max(0)
					player.incrementy_sp.chall4points=player.incrementy_sp.chall4points.max(diff.plus(1).pow(3).minus(1).times(100).floor());
			}
			
			
			if(hasUpgrade("incrementy_pi", 44) || hasMilestone("incrementy_o",4)){
					let target=player.modpoints[5].max(10).log(10).max(2).log(2);
					player.incrementy_sp.challenges[21]=Math.max(player.incrementy_sp.challenges[21],target.floor().min(100).toNumber());
					player.incrementy_sp.challenges[22]=Math.max(player.incrementy_sp.challenges[22],target.floor().min(100).toNumber());
			}
		},
		
        upgrades: {
                rows: 5,
                cols: 5, 
			11: {
				title: "Super Prestige Upgrade 11",
                description(){if(hasUpgrade("incrementy_sp",31))return "+2 Max Boson Challenge Completions per Super Prestige Upgrade";else return "+1 Max Boson Challenge Completions per Super Prestige Upgrade"},
                cost: new Decimal(500),
                unlocked() { return player.tm.buyables[5].gte(29); }, // The upgrade is only visible when this is true
			}, 
			12: {
				title: "Super Prestige Upgrade 12",
                description(){return "Boson & Shards gain are better."},
                cost: new Decimal(750),
                unlocked() { return player.tm.buyables[5].gte(30); }, // The upgrade is only visible when this is true
			},
			13: {
				title: "Super Prestige Upgrade 13",
                description(){return "Gain "+(hasUpgrade("incrementy_sp",24)?"1e6":hasUpgrade("incrementy_sp",22)?10000:100)+"% of Super Prestige points per second."},
                cost: new Decimal(1000),
                unlocked() { return player.tm.buyables[5].gte(31); }, // The upgrade is only visible when this is true
			},
			14: {
				title: "Super Prestige Upgrade 14",
                description(){return "Boson & Shards gain are better."},
                cost: new Decimal(10000),
                unlocked() { return player.tm.buyables[5].gte(31); }, // The upgrade is only visible when this is true
			},
			15: {
				title: "Super Prestige Upgrade 15",
                description(){return "Remove some softcaps in Boson Challenge 1 reward."},
                cost: new Decimal(50000),
                unlocked() { return player.tm.buyables[5].gte(31); }, // The upgrade is only visible when this is true
			},
			21: {
				title: "Super Prestige Upgrade 21",
                description(){return "Antimatter gain is better."},
                cost: new Decimal(500000),
                unlocked() { return player.tm.buyables[5].gte(31); }, // The upgrade is only visible when this is true
			},
			22: {
				title: "Super Prestige Upgrade 22",
                description(){return "100x to Super Prestige Upgrade 13"},
                cost: new Decimal(1500000),
                unlocked() { return player.tm.buyables[5].gte(31); }, // The upgrade is only visible when this is true
			},
			23: {
				title: "Super Prestige Upgrade 23",
                description(){return "Remove Boson effect Softcap"},
                cost: new Decimal(5e7),
                unlocked() { return player.tm.buyables[5].gte(31); }, // The upgrade is only visible when this is true
			},
			24: {
				title: "Super Prestige Upgrade 24",
                description(){return "100x to Super Prestige Upgrade 13"},
                cost: new Decimal(3e8),
                unlocked() { return player.tm.buyables[5].gte(31); }, // The upgrade is only visible when this is true
			},
			25: {
				title: "Super Prestige Upgrade 25",
                description(){return "Base Antimatter gain is better (2x per incrementy buyable level)"},
                cost: new Decimal(1e10),
                unlocked() { return player.tm.buyables[5].gte(31); }, // The upgrade is only visible when this is true
			},
			31: {
				title: "Super Prestige Upgrade 31",
                description(){return "Super Prestige Upgrade 11's effect is doubled."},
                cost: new Decimal(2e10),
                unlocked() { return player.tm.buyables[5].gte(32); }, // The upgrade is only visible when this is true
			},
			32: {
				title: "Super Prestige Upgrade 32",
                description(){return "Amoeba effect to Antimatter is better."},
                cost: new Decimal(6e10),
                unlocked() { return player.tm.buyables[5].gte(32); }, // The upgrade is only visible when this is true
			},
			33: {
				title: "Super Prestige Upgrade 33",
                description(){return "Base Amoeba gain is better."},
                cost: new Decimal(2e11),
                unlocked() { return player.tm.buyables[5].gte(32); }, // The upgrade is only visible when this is true
			},
			34: {
				title: "Super Prestige Upgrade 34",
                description(){return "Each Super Prestige Upgrade pushes the Incrementy Stamina Softcap Start back by 0.1"},
                cost: new Decimal(1e11),
                unlocked() { return player.tm.buyables[5].gte(33); }, // The upgrade is only visible when this is true
			},
			35: {
				title: "Super Prestige Upgrade 35",
                description(){return "Unlock more SP challenges."},
                cost: new Decimal(3e11),
                unlocked() { return player.tm.buyables[5].gte(33); }, // The upgrade is only visible when this is true
			},
			41: {
				title: "Super Prestige Upgrade 41",
                description(){return "Reduce SP challenge goals."},
                cost: new Decimal(1e15),
                unlocked() { return player.tm.buyables[5].gte(35); }, // The upgrade is only visible when this is true
			},
			42: {
				title: "Super Prestige Upgrade 42",
                description(){return "Amoeba effect to Incrementy is applied before Incrementy Stamina"},
                cost: new Decimal(3e15),
                unlocked() { return player.tm.buyables[5].gte(35); }, // The upgrade is only visible when this is true
			},
			43: {
				title: "Super Prestige Upgrade 43",
                description(){return "Square Quartz reward"},
                cost: new Decimal(6e15),
                unlocked() { return player.tm.buyables[5].gte(35); }, // The upgrade is only visible when this is true
			},
			44: {
				title: "Super Prestige Upgrade 44",
                description(){return "Amoeba effect to Antimatter is better."},
                cost: new Decimal(3e18),
                unlocked() { return player.tm.buyables[5].gte(35); }, // The upgrade is only visible when this is true
			},
			45: {
				title: "Super Prestige Upgrade 45",
                description(){return "Base Antimatter gain is better (3x per incrementy buyable level)"},
                cost: new Decimal(1e19),
                unlocked() { return player.tm.buyables[5].gte(35); }, // The upgrade is only visible when this is true
			},
			51: {
				title: "Super Prestige Upgrade 51",
                description(){return "Boson challenge completions boost Super Prestige point gain."},
                cost: new Decimal(2e19),
                unlocked() { return player.tm.buyables[5].gte(36); }, // The upgrade is only visible when this is true
				effect() {
                    let ret = Decimal.pow(1.2,(layers.incrementy_b.getBChallengeTotal())**(hasUpgrade("incrementy_sp",53)?0.75:0.5));
                    return ret;
				},
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			52: {
				title: "Super Prestige Upgrade 52",
                description(){return "Unlock more Amoeba upgrades"},
                cost: new Decimal(3e20),
                unlocked() { return player.tm.buyables[5].gte(36); }, // The upgrade is only visible when this is true
			},
			53: {
				title: "Super Prestige Upgrade 53",
                description(){return "Super Prestige Upgrade 51 is better."},
                cost: new Decimal(3e23),
                unlocked() { return player.tm.buyables[5].gte(36); }, // The upgrade is only visible when this is true
			},
			54: {
				title: "Super Prestige Upgrade 54",
                description(){return "Incrementy Stamina are cheaper."},
                cost: new Decimal(1e27),
                unlocked() { return player.tm.buyables[5].gte(37); }, // The upgrade is only visible when this is true
			},
			55: {
				title: "Super Prestige Upgrade 55",
                description(){return "Unlock more Energy upgrades."},
                cost: new Decimal(1e28),
                unlocked() { return player.tm.buyables[5].gte(37); }, // The upgrade is only visible when this is true
			},
		},
	passiveGeneration(){
		if(hasUpgrade("incrementy_sp",13) && hasUpgrade("incrementy_sp",24))return 1e4;
		if(hasUpgrade("incrementy_sp",13) && hasUpgrade("incrementy_sp",22))return 100;
		if(hasUpgrade("incrementy_sp",13))return 1;
		return 0;
	},

});



addLayer("incrementy_pi", {
        name: "incrementy_pi", 
        symbol: "π", 
        position: 0,
        startData() { return {
                unlocked: false,
				points: new Decimal(0),
				hidelayers: false
        }},
        color: "#EC8241",
        requires: new Decimal(1e30), 
        resource: "Pions",
       baseResource: "Super Prestige Points",
        baseAmount() {return player.incrementy_sp.points}, 
        branches: ["incrementy_sp"],
        type: "normal", 
        effect(){
                let amt = player.incrementy_pi.points
                let ret = amt.sqrt();
				if(ret.gte(6))ret=ret.add(994).log10().mul(2);
				if(ret.gte(8))ret=ret.mul(512).root(4);
				ret=ret.min(this.effect2());
                
                return ret
        },
        effect2(){
                let amt = new Decimal(4);
                if(player.tm.buyables[5].gte(39))amt = amt.add(2);
                if(player.tm.buyables[5].gte(42))amt = amt.add(2);
                if(hasUpgrade("incrementy_pi",33))amt = amt.add(2);
                if(hasUpgrade("incrementy_o",14))amt = amt.add(2);
                if(hasMilestone("incrementy_o",6))amt = amt.add(2);
                return amt
        },
        effectDescription(){
                let eff = layers.incrementy_pi.effect()
                let eff2 = layers.incrementy_pi.effect2()
                let a = "which increases the Incrementy Stamina softcap by " + format(eff) + " (Max: "+format(eff2)+")";
                return a
        },
		
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(hasUpgrade("incrementy_pi",23))mult=mult.mul(upgradeEffect("incrementy_pi",23));
		if(player.milestone_m.best.gte(50))mult = mult.mul(tmp.milestone_m.milestone50Effect);
        mult = mult.times(layers.incrementy_o.effect());
		if(hasMilestone("incrementy_o",6))mult = mult.mul(1e5);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	getResetGain() {
		let ret=player.incrementy_sp.points;
		if(ret.lt("1e30"))return new Decimal(0);
		if(hasUpgrade("incrementy_pi",21)){
			ret=ret.add(10).log10().div(2).pow(1.5);
		}else{
			ret=ret.log10().div(10).pow(0.5);
		}
		if(hasUpgrade("incrementy_o",15))ret=ret.pow(buyableEffect("incrementy_o",12));
		ret=ret.mul(tmp.incrementy_pi.gainMult).floor();
		return ret;
	},
	getNextAt() {
		let ret=tmp.incrementy_pi.getResetGain.plus(1);
		ret=ret.div(tmp.incrementy_pi.gainMult);
		
		if(hasUpgrade("incrementy_pi",21)){
			ret=ret.pow(1/1.5).mul(2);
		}else{
			ret=ret.pow(2).mul(10);
		}
		ret=Decimal.pow(10,ret).max(1e30);
		return ret;
	},
		upgrades:{
                rows: 5,
                cols: 5,
        },
        row: 3, // Row the layer is in on the tree (0 is the first row)
        layerShown(){
                return player.tm.currentTree==5 && player.tm.buyables[5].gte(38)
        },
		doReset(l){
			if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || l=="incrementy_n" || l=="incrementy_g" || l=="incrementy_q" || l=="incrementy_p" ||  l=="incrementy_s" || l=="incrementy_sp" ||  l=="incrementy_pi" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_pi",["upgrades","milestones","challenges"]);
			return;
		},
        milestones: {
                1: {
                        requirementDescription: "1 Pion", 
                        effectDescription: "You can hide some layers in this tree (Keep I,N,P,S,SP and layers above SP).",
                        done(){
                                return player.incrementy_pi.best.gte(1)
                        },
						toggles:[["incrementy_pi","hidelayers"]]
                },
		},
        upgrades: {
                rows: 5,
                cols: 5, 
			11: {
				title: "Pion Upgrade 11",
                description: "Pions boost Super Prestige Points gain.",
                cost: new Decimal(30),
                unlocked() { return player.tm.buyables[5].gte(39); }, // The upgrade is only visible when this is true
				effect() {
                    let ret = player.incrementy_pi.points.pow(2).add(1);
                    return ret;
				},
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			}, 
			12: {
				title: "Pion Upgrade 12",
                description: "Square root Jewel Exponent (buff!)",
                cost: new Decimal(40),
                unlocked() { return player.tm.buyables[5].gte(39); }, // The upgrade is only visible when this is true
			}, 
			13: {
				title: "Pion Upgrade 13",
                description: "Incrementy Upgrade 12 is better.",
                cost: new Decimal(50),
                unlocked() { return player.tm.buyables[5].gte(40); }, // The upgrade is only visible when this is true
			}, 
			14: {
				title: "Pion Upgrade 14",
                description: "Pions boost coin gain in The Dynas Tree.",
                cost: new Decimal(60),
                unlocked() { return player.tm.buyables[5].gte(40); }, // The upgrade is only visible when this is true
				effect() {
                    let ret = player.incrementy_pi.points.pow(1.5).add(1);
                    return ret;
				},
				effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			}, 
			15: {
				title: "Pion Upgrade 15",
                description: "Matter gain softcap starts later.",
                cost: new Decimal(70),
                unlocked() { return player.tm.buyables[5].gte(40); }, // The upgrade is only visible when this is true
			}, 
			21: {
				title: "Pion Upgrade 21",
                description: "Pion gain is better.",
                cost: new Decimal(50),
                unlocked() { return player.tm.buyables[5].gte(41); }, // The upgrade is only visible when this is true
			}, 
			22: {
				title: "Pion Upgrade 22",
                description: "Super-Prestige gain is better.",
                cost: new Decimal(500),
                unlocked() { return player.tm.buyables[5].gte(41); }, // The upgrade is only visible when this is true
			}, 
			23: {
				title: "Pion Upgrade 23",
                description: "Boost Pion gain based on Pion upgrades.",
                cost: new Decimal(1000),
                unlocked() { return player.tm.buyables[5].gte(41); }, // The upgrade is only visible when this is true
				effect() {
                    let ret=Decimal.pow(hasUpgrade("incrementy_pi",32)?2:1.2,player.incrementy_pi.upgrades.length);
					return ret;
				},
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			24: {
				title: "Pion Upgrade 24",
                description: "Boson effect is better.",
                cost: new Decimal(3000),
                unlocked() { return player.tm.buyables[5].gte(41); }, // The upgrade is only visible when this is true
			},
			25: {
				title: "Pion Upgrade 25",
                description: "Particle Upgrade 34 is better.",
                cost: new Decimal(6000),
                unlocked() { return player.tm.buyables[5].gte(41); }, // The upgrade is only visible when this is true
			},
			31: {
				title: "Pion Upgrade 31",
                description: "Incrementy Stamina is cheaper.",
                cost: new Decimal(5000),
                unlocked() { return player.tm.buyables[5].gte(42); }, // The upgrade is only visible when this is true
			},
			32: {
				title: "Pion Upgrade 32",
                description: "Pion Upgrade 23 is better.",
                cost: new Decimal(20000),
                unlocked() { return player.tm.buyables[5].gte(42); }, // The upgrade is only visible when this is true
			},
			33: {
				title: "Pion Upgrade 33",
                description: "Max Pion Effect +2",
                cost: new Decimal(1e9),
                unlocked() { return player.tm.buyables[5].gte(42); }, // The upgrade is only visible when this is true
			},
			34: {
				title: "Pion Upgrade 34",
                description: "Gain 10000% of Pion gain per second.",
                cost: new Decimal(2e9),
                unlocked() { return hasUpgrade("tm",54); }, // The upgrade is only visible when this is true
			},
			35: {
				title: "Pion Upgrade 35",
                description: "Autoget Super-Prestige Challenge Points for First 2 SP Challenges.",
                cost: new Decimal(1e12),
                unlocked() { return hasUpgrade("tm",54); }, // The upgrade is only visible when this is true
			},
			41: {
				title: "Pion Upgrade 41",
                description: "Incrementy Stamina is cheaper.",
                cost: new Decimal(5e12),
                unlocked() { return hasUpgrade("tm",54); }, // The upgrade is only visible when this is true
			},
			42: {
				title: "Pion Upgrade 42",
                description: "In Game Dev Tree, Fame are cheaper.",
                cost: new Decimal(3e13),
                unlocked() { return hasUpgrade("tm",54); }, // The upgrade is only visible when this is true
			},
			43: {
				title: "Pion Upgrade 43",
                description: "In Game Dev Tree, 'CS 3354 Software Engineering' boost cash gain.",
                cost: new Decimal(6e15),
                unlocked() { return hasUpgrade("tm",54); }, // The upgrade is only visible when this is true
			},
			44: {
				title: "Pion Upgrade 44",
                description: "Autoget Completions and reduce target for First 2 SP Challenges.",
                cost: new Decimal(1e16),
                unlocked() { return hasUpgrade("tm",54); }, // The upgrade is only visible when this is true
			},
			45: {
				title: "Pion Upgrade 45",
                description: "SP challenge 2 reward is better.",
                cost: new Decimal(4e16),
                unlocked() { return hasUpgrade("tm",54); }, // The upgrade is only visible when this is true
			},
		},
	passiveGeneration(){
		if(hasUpgrade("incrementy_pi",34))return 100;
		return 0;
	},
})


addLayer("incrementy_o", {
        name: "Origin", 
        symbol: "O", 
        position: 0,
        startData() { return {
                unlocked: true,
		points: new Decimal(0),
                best: new Decimal(0),
                total: new Decimal(0),
                times: 0,
                time: 0,
                abtime: 0,
        }},
        color: "#79134A",
        requires: new Decimal(1e20), 
        resource: "Origins",
    baseResource: "Pions", // Name of resource prestige is based on
        baseAmount() {return player.incrementy_pi.points}, 
        branches: ["incrementy_pi"],
		row:4,
		layerShown(){return player.tm.currentTree==5 && player.tm.buyables[5].gte(43);},
        type: "normal", 
        effect(){
                let amt = player.incrementy_o.total
                let ret = amt.times(2).plus(1).pow(2)
                return ret
        },
        effectDescription(){
                let eff = layers.incrementy_o.effect()
                let a = "which boost Pions & Super-Prestige Points by " + format(eff) + " (based on total Origins)"

                return a + "."
        },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if(hasUpgrade("incrementy_o",11))mult=mult.mul(Decimal.pow(2,player.incrementy_o.upgrades.length));
		if(player.milestone_m.points.gte(69))mult=mult.mul(1.5)
		if(player.milestone_pm.best.gte(1))mult = mult.mul(tmp.milestone_pm.milestone1Effect);
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	getResetGain() {
		let ret=player.incrementy_pi.points;
		if(ret.lt("1e20"))return new Decimal(0);
		ret=ret.log10().div(20).pow(2).mul(tmp.incrementy_o.gainMult).floor();
		return ret;
	},
	getNextAt() {
		let ret=tmp.incrementy_o.getResetGain.plus(1);
		ret=ret.div(tmp.incrementy_o.gainMult);
		
		ret=ret.pow(0.5).mul(20);
		ret=Decimal.pow(10,ret).max(1e20);
		return ret;
	},
		doReset(l){
			if(l=="incrementy_i" || l=="incrementy_b" || l=="incrementy_am" || l=="incrementy_m" || l=="incrementy_a" || l=="incrementy_e" || l=="incrementy_n" || l=="incrementy_g" || l=="incrementy_q" || l=="incrementy_p" ||  l=="incrementy_s" || l=="incrementy_sp"  || l=="incrementy_o"  || l=="incrementy_f"  || l=="incrementy_c" || !l.startsWith("incrementy_")){return;}
			layerDataReset("incrementy_o",["upgrades","milestones"]);
			return;
		},
        buyables: {
                rows: 3,
                cols: 3,
                11: {
                        title: "Incrementy Boost",
                        display(){
                                let additional = ""
                                let ex = layers.incrementy_o.buyables[11].extra()
                                if (ex.gt(0)) additional = "+" + formatWhole(ex)

                                let start = "<b><h2>Amount</h2>: " + formatWhole(player.incrementy_o.buyables[11]) + additional + "</b><br>"
                                let eff = "<b><h2>Effect</h2>: ^" + format(layers.incrementy_o.buyables[11].effect(), 4) + " to Incrementy</b><br>"
                                let cost = "<b><h2>Cost</h2>: " + format(layers.incrementy_o.buyables[11].cost()) + " Origins</b><br>"
                                return "<br>" + start + eff + cost
                        },
                        cost(a){
                                let x = getBuyableAmount("incrementy_o", 11).plus(a)
                                let base1 = 2
                                let exp2 = x.times(x)
                                return Decimal.pow(base1, exp2)
                        },
                        effectBase(){
                                let base = new Decimal(1.001)
                                //if (hasUpgrade("o", 31)) base = base.plus(layers.o.buyables[11].total().times(.001))
                                //if (hasUpgrade("o", 45)) base = base.plus(layers.o.buyables[32].total().times(.1 ))
                                return base
                        },
                        effect(){
                                let x = layers.incrementy_o.buyables[11].total()
                                let base = layers.incrementy_o.buyables[11].effectBase()
                                return Decimal.pow(base, x)
                        },
                        canAfford(){
                                return player.incrementy_o.points.gte(layers.incrementy_o.buyables[11].cost())
                        },
                        total(){
                                return getBuyableAmount("incrementy_o", 11).plus(layers.incrementy_o.buyables[11].extra())
                        },
                        extra(){
                                let ret = new Decimal(0)
                                //if (hasUpgrade("o", 24)) ret = ret.plus(layers.o.buyables[12].total())
                                //if (hasUpgrade("o", 32)) ret = ret.plus(layers.o.buyables[13].total())
                                //if (hasUpgrade("o", 34)) ret = ret.plus(player.o.upgrades.length)
                                //ret = ret.plus(layers.o.buyables[21].total())
                                //ret = ret.plus(layers.o.buyables[31].total())
                                return ret
                        },
                        buy(){
                                let cost = layers.incrementy_o.buyables[11].cost()
                                if (!layers.incrementy_o.buyables[11].canAfford()) return
                                player.incrementy_o.buyables[11] = player.incrementy_o.buyables[11].plus(1)
                                player.incrementy_o.points = player.incrementy_o.points.minus(cost)
                        },
                        buyMax(maximum){       
                                return
                        },
                        unlocked(){ return true },
                },
                12: {
                        title: "Pion Boost",
                        display(){
                                let additional = ""
                                let ex = layers.incrementy_o.buyables[12].extra()
                                if (ex.gt(0)) additional = "+" + formatWhole(ex)

                                let start = "<b><h2>Amount</h2>: " + formatWhole(player.incrementy_o.buyables[12]) + additional + "</b><br>"
                                let eff = "<b><h2>Effect</h2>: ^" + format(layers.incrementy_o.buyables[12].effect(), 4) + " to Base Pion gain</b><br>"
                                let cost = "<b><h2>Cost</h2>: " + format(layers.incrementy_o.buyables[12].cost()) + " Origins</b><br>"
                                return "<br>" + start + eff + cost
                        },
                        cost(a){
                                let x = getBuyableAmount("incrementy_o", 12).plus(a)
                                let base1 = 3
                                let exp2 = x.times(x)
                                return Decimal.pow(base1, exp2)
                        },
                        effectBase(){
                                let base = new Decimal(1.02)
                                //if (hasUpgrade("o", 32)) base = base.plus(layers.o.buyables[12].total().times(.002))
                                //if (hasUpgrade("f", 13)) base = base.plus(layers.o.buyables[33].total().times(player.f.upgrades.length).div(100))
                                //base = base.plus(layers.f.nadphEffect())
                                return base
                        },
                        effect(){
                                let x = layers.incrementy_o.buyables[12].total()
                                let base = layers.incrementy_o.buyables[12].effectBase()
                                return Decimal.pow(base, x)
                        },
                        canAfford(){
                                return player.incrementy_o.points.gte(layers.incrementy_o.buyables[12].cost())
                        },
                        total(){
                                return getBuyableAmount("incrementy_o", 12).plus(layers.incrementy_o.buyables[12].extra())
                        },
                        extra(){
                                let ret = new Decimal(0)
                                //if (hasUpgrade("o", 25)) ret = ret.plus(layers.o.buyables[13].total())
                                //ret = ret.plus(layers.o.buyables[22].total())
                                //ret = ret.plus(layers.o.buyables[32].total())
                                return ret
                        },
                        buy(){
                                let cost = layers.incrementy_o.buyables[12].cost()
                                if (!layers.incrementy_o.buyables[12].canAfford()) return
                                player.incrementy_o.buyables[12] = player.incrementy_o.buyables[12].plus(1)
                                player.incrementy_o.points = player.incrementy_o.points.minus(cost)
                        },
                        buyMax(maximum){       
                                return
                        },
                        unlocked(){ return hasUpgrade("incrementy_o", 15) },
                },/*
                13: {
                        title: "Stamina Boost",
                        display(){
                                let additional = ""
                                let ex = layers.o.buyables[13].extra()
                                if (ex.gt(0)) additional = "+" + formatWhole(ex)

                                let start = "<b><h2>Amount</h2>: " + formatWhole(player.o.buyables[13]) + additional + "</b><br>"
                                let eff = "<b><h2>Effect</h2>: " + formatWhole(layers.o.buyables[13].effect()) + " Free Stamina Levels</b><br>"
                                let cost = "<b><h2>Cost</h2>: " + format(layers.o.buyables[13].cost()) + " Origins</b><br>"
                                let eformula = "<b><h2>Effect formula</h2>:<br> x" + (layers.o.buyables[13].total().gt(10) ? "*10" : "^2") +"</b><br>"
                                let end = shiftDown ? eformula : "Shift to see details"
                                return "<br>" + start + eff + cost + end
                        },
                        cost(a){
                                let x = getBuyableAmount("o", 13).plus(a)
                                let base1 = 4
                                let base2 = 1.5
                                let exp2 = x.times(x)
                                return Decimal.pow(base2, exp2).times(Decimal.pow(base1, x)).ceil()
                        },
                        effectBase(){
                                let base = new Decimal(1.02)
                                return base
                        },
                        effect(){
                                let x = layers.o.buyables[13].total()
                                return Decimal.times(x, x.min(10))
                        },
                        canAfford(){
                                return player.o.points.gte(layers.o.buyables[13].cost())
                        },
                        total(){
                                return getBuyableAmount("o", 13).plus(layers.o.buyables[13].extra())
                        },
                        extra(){
                                let ret = new Decimal(0)
                                ret = ret.plus(layers.o.buyables[23].total())
                                ret = ret.plus(layers.o.buyables[33].total())
                                if (hasUpgrade("f", 31)) ret = ret.plus(layers.f.buyables[13].total())
                                if (devSpeedUp && layers.o.buyables[13].unlocked()) ret = ret.plus(1)
                                return ret
                        },
                        buy(){
                                let cost = layers.o.buyables[13].cost()
                                if (!layers.o.buyables[13].canAfford()) return
                                player.o.buyables[13] = player.o.buyables[13].plus(1)
                                player.o.points = player.o.points.minus(cost)
                        },
                        buyMax(maximum){       
                                return
                        },
                        unlocked(){ return hasUpgrade("o", 23) },
                },
                21: {
                        title: "Particle Boost",
                        display(){
                                let additional = ""
                                let ex = layers.o.buyables[21].extra()
                                if (ex.gt(0)) additional = "+" + formatWhole(ex)

                                let start = "<b><h2>Amount</h2>: " + formatWhole(player.o.buyables[21]) + additional + "</b><br>"
                                let eff = "<b><h2>Effect</h2>: ^" + format(layers.o.buyables[21].effect(), 4) + " Particle Gain</b><br>"
                                let cost = "<b><h2>Cost</h2>: " + format(layers.o.buyables[21].cost()) + " Origins</b><br>"
                                let eformula = "<b><h2>Effect formula</h2>:<br>" + format(layers.o.buyables[21].effectBase(), 3) + "^x</b><br>"
                                let end = shiftDown ? eformula : "Shift to see details"
                                return "<br>" + start + eff + cost + end
                        },
                        cost(a){
                                let x = getBuyableAmount("o", 21).plus(a)
                                let base0 = 100
                                let base1 = 8
                                let base2 = 1.5
                                let exp2 = x.times(x)
                                return Decimal.pow(base2, exp2).times(Decimal.pow(base1, x)).times(base0).ceil()
                        },
                        effectBase(){
                                let base = new Decimal(1.25)
                                if (hasUpgrade("o", 51)) base = base.plus(layers.o.buyables[23].total().div(10))
                                return base
                        },
                        effect(){
                                let x = layers.o.buyables[21].total()
                                let base = layers.o.buyables[21].effectBase()
                                return Decimal.pow(base, x)
                        },
                        canAfford(){
                                return player.o.points.gte(layers.o.buyables[21].cost())
                        },
                        total(){
                                return getBuyableAmount("o", 21).plus(layers.o.buyables[21].extra())
                        },
                        extra(){
                                let ret = new Decimal(0)
                                if (hasUpgrade("o", 42)) ret = ret.plus(layers.o.buyables[22].total())
                                ret = ret.plus(layers.o.buyables[31].total())
                                if (hasUpgrade("o", 51)) ret = ret.plus(layers.o.buyables[23].total())
                                return ret
                        },
                        buy(){
                                let cost = layers.o.buyables[21].cost()
                                if (!layers.o.buyables[21].canAfford()) return
                                player.o.buyables[21] = player.o.buyables[21].plus(1)
                                player.o.points = player.o.points.minus(cost)
                        },
                        buyMax(maximum){       
                                return
                        },
                        unlocked(){ return hasUpgrade("o", 31) },
                },
                22: {
                        title: "Super Prestige Boost",
                        display(){
                                let additional = ""
                                let ex = layers.o.buyables[22].extra()
                                if (ex.gt(0)) additional = "+" + formatWhole(ex)

                                let start = "<b><h2>Amount</h2>: " + formatWhole(player.o.buyables[22]) + additional + "</b><br>"
                                let eff = "<b><h2>Effect</h2>: ^" + format(layers.o.buyables[22].effect(), 4) + " Super Prestige Point gain</b><br>"
                                let cost = "<b><h2>Cost</h2>: " + format(layers.o.buyables[22].cost()) + " Origins</b><br>"
                                let eformula = "<b><h2>Effect formula</h2>:<br>" + format(layers.o.buyables[22].effectBase(), 3) + "^x</b><br>"
                                let end = shiftDown ? eformula : "Shift to see details"
                                return "<br>" + start + eff + cost + end
                        },
                        cost(a){
                                let x = getBuyableAmount("o", 22).plus(a)
                                let base0 = 400
                                let base1 = 4
                                let base2 = 2
                                let exp2 = x.times(x)
                                return Decimal.pow(base2, exp2).times(Decimal.pow(base1, x)).times(base0)
                        },
                        effectBase(){
                                let base = new Decimal(1.5)
                                
                                base = base.pow(layers.f.acetylcoaEffect())
                                return base
                        },
                        effect(){
                                let x = layers.o.buyables[22].total()
                                let base = layers.o.buyables[22].effectBase()
                                return Decimal.pow(base, x)
                        },
                        canAfford(){
                                return player.o.points.gte(layers.o.buyables[22].cost())
                        },
                        total(){
                                return getBuyableAmount("o", 22).plus(layers.o.buyables[22].extra())
                        },
                        extra(){
                                let ret = new Decimal(0)
                                if (hasUpgrade("o", 41)) ret = ret.plus(layers.o.buyables[23].total())
                                ret = ret.plus(layers.o.buyables[32].total())
                                if (hasUpgrade("o", 44)) ret = ret.plus(layers.o.buyables[31].total().times(3))
                                if (hasUpgrade("f", 23)) ret = ret.plus(layers.f.buyables[22].total())
                                return ret
                        },
                        buy(){
                                let cost = layers.o.buyables[22].cost()
                                if (!layers.o.buyables[22].canAfford()) return
                                player.o.buyables[22] = player.o.buyables[22].plus(1)
                                player.o.points = player.o.points.minus(cost)
                        },
                        buyMax(maximum){       
                                return
                        },
                        unlocked(){ return hasUpgrade("o", 31) },
                },
                23: {
                        title: "Origin Boost",
                        display(){
                                let additional = ""
                                let ex = layers.o.buyables[23].extra()
                                if (ex.gt(0)) additional = "+" + formatWhole(ex)

                                let start = "<b><h2>Amount</h2>: " + formatWhole(player.o.buyables[23]) + additional + "</b><br>"
                                let eff = "<b><h2>Effect</h2>: *" + format(layers.o.buyables[23].effect()) + " Origin gain</b><br>"
                                let cost = "<b><h2>Cost</h2>: " + format(layers.o.buyables[23].cost()) + " Origins</b><br>"
                                let eformula = "<b><h2>Effect formula</h2>:<br>" + format(layers.o.buyables[23].effectBase(), 3) + "^x</b><br>"
                                let end = shiftDown ? eformula : "Shift to see details"
                                return "<br>" + start + eff + cost + end
                        },
                        cost(a){
                                let x = getBuyableAmount("o", 23).plus(a)
                                let base0 = 1000
                                let base1 = 8
                                let base2 = 2.5
                                let exp2 = x.times(x)
                                return Decimal.pow(base2, exp2).times(Decimal.pow(base1, x)).times(base0)
                        },
                        effectBase(){
                                let base = new Decimal(2)
                                if (hasUpgrade("o", 43)) base = base.plus(layers.o.buyables[11].total().div(100))
                                return base
                        },
                        effect(){
                                let x = layers.o.buyables[23].total()
                                let base = layers.o.buyables[23].effectBase()
                                return Decimal.pow(base, x)
                        },
                        canAfford(){
                                return player.o.points.gte(layers.o.buyables[23].cost())
                        },
                        total(){
                                return getBuyableAmount("o", 23).plus(layers.o.buyables[23].extra())
                        },
                        extra(){
                                let ret = new Decimal(0)
                                if (hasUpgrade("o", 41)) ret = ret.plus(2)
                                ret = ret.plus(layers.o.buyables[33].total())
                                if (hasUpgrade("o", 43)) ret = ret.plus(layers.o.buyables[31].total())
                                if (devSpeedUp && layers.o.buyables[23].unlocked()) ret = ret.plus(1)
                                return ret
                        },
                        buy(){
                                let cost = layers.o.buyables[23].cost()
                                if (!layers.o.buyables[23].canAfford()) return
                                player.o.buyables[23] = player.o.buyables[23].plus(1)
                                player.o.points = player.o.points.minus(cost)
                        },
                        buyMax(maximum){       
                                return
                        },
                        unlocked(){ return hasUpgrade("o", 31) },
                },
                31: {
                        title: "Neutrino Boost",
                        display(){
                                let additional = ""
                                let ex = layers.o.buyables[31].extra()
                                if (ex.gt(0)) additional = "+" + formatWhole(ex)

                                let start = "<b><h2>Amount</h2>: " + formatWhole(player.o.buyables[31]) + additional + "</b><br>"
                                let eff = "<b><h2>Effect</h2>: ^" + format(layers.o.buyables[31].effect(), 4) + " Neutrino Gain</b><br>"
                                let cost = "<b><h2>Cost</h2>: " + format(layers.o.buyables[31].cost()) + " Origins</b><br>"
                                let eformula = "<b><h2>Effect formula</h2>:<br>" + format(layers.o.buyables[31].effectBase(), 3) + "^x</b><br>"
                                let end = shiftDown ? eformula : "Shift to see details"
                                return "<br>" + start + eff + cost + end
                        },
                        cost(a){
                                let x = getBuyableAmount("o", 31).plus(a)
                                let base0 = 50e6
                                let base1 = 3
                                let base2 = 2
                                let exp2 = x.times(x)
                                return Decimal.pow(base2, exp2).times(Decimal.pow(base1, x)).times(base0)
                        },
                        effectBase(){
                                let base = new Decimal(1.25)
                                return base
                        },
                        effect(){
                                let x = layers.o.buyables[31].total()
                                let base = layers.o.buyables[31].effectBase()
                                return Decimal.pow(base, x)
                        },
                        canAfford(){
                                return player.o.points.gte(layers.o.buyables[31].cost())
                        },
                        total(){
                                return getBuyableAmount("o", 31).plus(layers.o.buyables[31].extra())
                        },
                        extra(){
                                let ret = new Decimal(0)
                                if (hasUpgrade("o", 45)) ret = ret.plus(layers.o.buyables[32].total())
                                if (hasUpgrade("f", 11)) ret = ret.plus(layers.o.buyables[33].total())
                                return ret
                        },
                        buy(){
                                let cost = layers.o.buyables[31].cost()
                                if (!layers.o.buyables[31].canAfford()) return
                                player.o.buyables[31] = player.o.buyables[31].plus(1)
                                player.o.points = player.o.points.minus(cost)
                        },
                        buyMax(maximum){       
                                return
                        },
                        unlocked(){ return hasUpgrade("o", 43) },
                },
                32: {
                        title: "Shard Boost",
                        display(){
                                let additional = ""
                                let ex = layers.o.buyables[32].extra()
                                if (ex.gt(0)) additional = "+" + formatWhole(ex)

                                let start = "<b><h2>Amount</h2>: " + formatWhole(player.o.buyables[32]) + additional + "</b><br>"
                                let eff = "<b><h2>Effect</h2>: ^" + format(layers.o.buyables[32].effect(), 4) + " Shard gain</b><br>"
                                let cost = "<b><h2>Cost</h2>: " + format(layers.o.buyables[32].cost()) + " Origins</b><br>"
                                let eformula = "<b><h2>Effect formula</h2>:<br>" + format(layers.o.buyables[32].effectBase(), 3) + "^x</b><br>"
                                let end = shiftDown ? eformula : "Shift to see details"
                                return "<br>" + start + eff + cost + end
                        },
                        cost(a){
                                let x = getBuyableAmount("o", 32).plus(a)
                                let base0 = 5e10
                                let base1 = 10
                                let base2 = 5
                                let exp2 = x.times(x)
                                return Decimal.pow(base2, exp2).times(Decimal.pow(base1, x)).times(base0)
                        },
                        effectBase(){
                                let base = new Decimal(5)
                                return base
                        },
                        effect(){
                                let x = layers.o.buyables[32].total()
                                let base = layers.o.buyables[32].effectBase()
                                return Decimal.pow(base, x)
                        },
                        canAfford(){
                                return player.o.points.gte(layers.o.buyables[32].cost())
                        },
                        total(){
                                return getBuyableAmount("o", 32).plus(layers.o.buyables[32].extra())
                        },
                        extra(){
                                let ret = new Decimal(0)
                                if (hasUpgrade("o", 52)) ret = ret.plus(2)
                                if (hasUpgrade("o", 53)) ret = ret.plus(layers.o.buyables[33].total())
                                return ret
                        },
                        buy(){
                                let cost = layers.o.buyables[32].cost()
                                if (!layers.o.buyables[32].canAfford()) return
                                player.o.buyables[32] = player.o.buyables[32].plus(1)
                                player.o.points = player.o.points.minus(cost)
                        },
                        buyMax(maximum){       
                                return
                        },
                        unlocked(){ return hasUpgrade("o", 43) },
                },
                33: {
                        title: "Base Origin Boost",
                        display(){
                                let additional = ""
                                let ex = layers.o.buyables[33].extra()
                                if (ex.gt(0)) additional = "+" + formatWhole(ex)

                                let start = "<b><h2>Amount</h2>: " + formatWhole(player.o.buyables[33]) + additional + "</b><br>"
                                let eff = "<b><h2>Effect</h2>: *" + format(layers.o.buyables[33].effect()) + " Base Origins</b><br>"
                                let cost = "<b><h2>Cost</h2>: " + format(layers.o.buyables[33].cost()) + " Origins</b><br>"
                                let eformula = "<b><h2>Effect formula</h2>:<br>" + format(layers.o.buyables[33].effectBase(), 3) + "^x</b><br>"
                                let end = shiftDown ? eformula : "Shift to see details"
                                return "<br>" + start + eff + cost + end
                        },
                        cost(a){
                                let x = getBuyableAmount("o", 33).plus(a)
                                let base0 = 1e39
                                let base1 = 2
                                let base2 = 25
                                let exp2 = x.times(x)
                                return Decimal.pow(base2, exp2).times(Decimal.pow(base1, x)).times(base0)
                        },
                        effectBase(){
                                let base = new Decimal(5)
                                let a = player.i.points.max(10).log10().max(10).log10().max(10).log10()
                                if (a.gt(5)) base = a
                                base = base.plus(layers.f.waterEffect())
                                return base
                        },
                        effect(){
                                let x = layers.o.buyables[33].total()
                                let base = layers.o.buyables[33].effectBase()
                                return Decimal.pow(base, x)
                        },
                        canAfford(){
                                return player.o.points.gte(layers.o.buyables[33].cost())
                        },
                        total(){
                                return getBuyableAmount("o", 33).plus(layers.o.buyables[33].extra())
                        },
                        extra(){
                                let ret = new Decimal(0)
                                if (hasUpgrade("o", 55)) ret = ret.plus(player.f.upgrades.length)
                                ret = ret.plus(layers.f.g6pEffect())
                                return ret
                        },
                        buy(){
                                let cost = layers.o.buyables[33].cost()
                                if (!layers.o.buyables[33].canAfford()) return
                                player.o.buyables[33] = player.o.buyables[33].plus(1)
                                player.o.points = player.o.points.minus(cost)
                        },
                        buyMax(maximum){       
                                return
                        },
                        unlocked(){ return hasUpgrade("o", 43) },
                },*/
        },
        upgrades:{
                rows: 5,
                cols: 5,
                11: {
                        title: "Origin Upgrade 11",
                        description: "Each Origin Upgrade double Origin gain",
                        cost: new Decimal(10),
                        unlocked(){return player.tm.buyables[5].gte(44)}
                },
                12: {
                        title: "Origin Upgrade 12",
                        description: "For each Origin upgrade, Gain 100% of Origin gain per second",
                        cost: new Decimal(100),
                        unlocked(){return player.tm.buyables[5].gte(44)}
                },
                13: {
                        title: "Origin Upgrade 13",
                        description: "Gain a free Incrementy Stamina level",
                        cost: new Decimal(1000),
                        unlocked(){return player.tm.buyables[5].gte(44)}
                },
                14: {
                        title: "Origin Upgrade 14",
                        description: "Max Pion Effect +2",
                        cost: new Decimal(10000),
                        unlocked(){return player.tm.buyables[5].gte(44)}
                },
                15: {
                        title: "Origin Upgrade 15",
                        description: "Unlock 2nd Origin Buyable",
                        cost: new Decimal(100000),
                        unlocked(){return player.tm.buyables[5].gte(44)}
                },
                21: {
                        title: "Origin Upgrade 21",
                        description: "Each Origin Upgrade increase Boson Challenge completion limit by 1",
                        cost: new Decimal(1e6),
                        unlocked(){return player.tm.buyables[5].gte(44)}
                },
                22: {
                        title: "Origin Upgrade 22",
                        description: "Get a free Incrementy Stamina level per Origin Upgrade",
                        cost: new Decimal(1e7),
                        unlocked(){return player.tm.buyables[5].gte(44)}
                },/*
                13: {
                        title: "Grothendieck",
                        description: "Multiply Super Prestige gain and effect by 2 and gain 5x more SP resets",
                        cost: new Decimal(1),
                        unlocked(){
                                return hasUpgrade("o", 12) || player.c.best.gt(0)
                        }
                },
                14: {
                        title: "Baker",
                        description: "Each Origin reset allows you to keep two more Shard upgrades and gain a free Incrementy Stamina level",
                        cost: new Decimal(2),
                        unlocked(){
                                return hasUpgrade("o", 13) || player.c.best.gt(0)
                        }
                },
                15: {
                        title: "Hironaka",
                        description: "Get a free Incrementy Stamina level per Origin Upgrade",
                        cost: new Decimal(2),
                        unlocked(){
                                return hasUpgrade("o", 14) || player.c.best.gt(0)
                        }
                },
                21: {
                        title: "Novikov",
                        description: "Keep �� upgrades, �� milestones, I upgrades, and multiply Origin gain by 1.5",
                        cost: new Decimal(5),
                        unlocked(){
                                return hasUpgrade("o", 15) || player.c.best.gt(0)
                        }
                },
                22: {
                        title: "Mumford",
                        description: "Unlock another buyable and Incrementy autobuyers can buy 25x faster",
                        cost: new Decimal(5),
                        unlocked(){
                                return (hasUpgrade("o", 21) && getBuyableAmount("o", 11).gte(3))  || player.c.best.gt(0)
                        }
                },
                23: {
                        title: "Deligne",
                        description: "Unlock another buyable and double Origin gain",
                        cost: new Decimal(10),
                        unlocked(){
                                return (hasUpgrade("o", 22) && getBuyableAmount("o", 12).gte(2)) || player.c.best.gt(0)
                        }
                },
                24: {
                        title: "Fefferman",
                        description: "Pion Boost gives free Incrementy Boost levels and double Origin gain",
                        cost: new Decimal(25),
                        unlocked(){
                                return (hasUpgrade("o", 23) && getBuyableAmount("o", 13).gte(2)) || player.c.best.gt(0)
                        }
                },
                25: {
                        title: "Margulis",
                        description: "Stamina Boost gives free Pion Boost levels",
                        cost: new Decimal(50),
                        unlocked(){
                                return (hasUpgrade("o", 24) && getBuyableAmount("o", 13).gte(3) || getBuyableAmount("o", 12).gte(3)) || player.c.best.gt(0)
                        }
                },
                31: {
                        title: "Quillen",
                        description: "Unlock three Origin buyables and each Incrementy Boost buyable adds .001 to its base",
                        cost: new Decimal(200),
                        unlocked(){
                                return (hasUpgrade("o", 25) && getBuyableAmount("o", 13).gte(3) && getBuyableAmount("o", 12).gte(3)) || player.c.best.gt(0)
                        }
                },
                32: {
                        title: "Connes",
                        description: "Stamina Boost buyables give levels to Incrementy Boost and each Pion Boost buyable adds .002 to its base",
                        cost: new Decimal(200),
                        unlocked(){
                                return hasUpgrade("o", 31) || player.c.best.gt(0)
                        }
                },
                33: {
                        title: "Yau",
                        description: "Each Incrementy Boost buyable increases the Incrementy Stamina softcap start by one",
                        cost: new Decimal(250),
                        unlocked(){
                                return hasUpgrade("o", 32) || player.c.best.gt(0)
                        }
                },
                34: {
                        title: "Donaldson",
                        description: "Each Origin upgrade gives a free Incrementy Boost buyable and triple Origin gain",
                        cost: new Decimal(500),
                        unlocked(){
                                return (hasUpgrade("o", 33) && getBuyableAmount("o", 22).gte(1)) || player.c.best.gt(0)
                        }
                },
                35: {
                        title: "Faltings",
                        description: "Remove the ability to Prestige but gain 100% of Origins on prestige per second",
                        cost: new Decimal(2500),
                        unlocked(){
                                return (hasUpgrade("o", 34) && getBuyableAmount("o", 21).gte(2)) || player.c.best.gt(0)
                        }
                },
                41: {
                        title: "Freedman",
                        description: "Origin Boost gives free levels to Super Prestige Boost and gain two free Origin Boosts",
                        cost: new Decimal(4e5),
                        unlocked(){
                                return hasUpgrade("o", 35) || player.c.best.gt(0)
                        }
                },
                42: {
                        title: "Drinfeld",
                        description: "Super Prestige Boost gives free levels to Particle Boost and push the Incrementy Stamina softcap start back by 42",
                        cost: new Decimal(5e6),
                        unlocked(){
                                return hasUpgrade("o", 41) || player.c.best.gt(0)
                        }
                },
                43: {
                        title: "Mori",
                        description: "Unlock a third row of Origin Buyables and each Incrementy Boost buyable adds .01 to Origin Boost base",
                        cost: new Decimal(6e6),
                        unlocked(){
                                return hasUpgrade("o", 42) || player.c.best.gt(0)
                        }
                },
                44: {
                        title: "Jones",
                        description: "Neutrino Boost levels give three free levels to Super Prestige Boost and one to Origin Boost",
                        cost: new Decimal(2e7),
                        unlocked(){
                                return hasUpgrade("o", 43) || player.c.best.gt(0)
                        }
                },
                45: {
                        title: "Bourgain",
                        description: "Shard Boost gives free levels to Neutrino Boost and add .1 to the Incrementy Boost base",
                        cost: new Decimal(1e11),
                        unlocked(){
                                return hasUpgrade("o", 44) || player.c.best.gt(0)
                        }
                },
                51: {
                        title: "Witten",
                        description: "Origin Boost gives free levels to Particle Boost and add .1 to the base",
                        cost: new Decimal(5e19),
                        unlocked(){
                                return hasUpgrade("o", 45) || player.c.best.gt(0)
                        }
                },
                52: {
                        title: "Lions",
                        description: "Gain two free levels of Shard Boost and Neutrino Autobuyers can buy 100x more",
                        cost: new Decimal(1e24),
                        unlocked(){
                                return hasUpgrade("o", 51) || player.c.best.gt(0)
                        }
                },
                53: {
                        title: "Yoccoz",
                        description: "Base Origin buyables give free levels to Shard Boost",
                        cost: new Decimal(1.5e59),
                        unlocked(){
                                return hasUpgrade("o", 52) || player.c.best.gt(0)
                        }
                },
                54: {
                        title: "Zelmanov",
                        description: "Per Origin Boost Buyables cubed you can buy one more Incrementy Stamina level and unlock Fragments",
                        cost: new Decimal(2e145),
                        unlocked(){
                                return hasUpgrade("o", 53) || player.c.best.gt(0)
                        }
                },
                55: {
                        title: "Villani",
                        description: "Each Fragment upgrade gives a free Base Origin Boost",
                        cost: new Decimal("1e1550"),
                        unlocked(){
                                return hasUpgrade("o", 54) || player.c.best.gt(0)
                        }
                },*/
        },
        milestones: {
                0: {
                        requirementDescription: "<b>Hrmander</b><br>Requires: 1 total Origins", 
                        effectDescription: "Remove Matter Effect but Matter gain softcap starts later",
                        done(){
                                return player.incrementy_o.total.gte(1)
                        },
                },
                1: {
                        requirementDescription: "<b>Milnor</b><br>Requires: 2 total Origins", 
                        effectDescription: "Reduce Antimatter Effect but reduce SP challenge 3-4 goal",
                        done(){
                                return player.incrementy_o.total.gte(2)
                        },
                },
                2: {
                        requirementDescription: "<b>Atiyah</b><br>Requires: 3 total Origins", 
                        effectDescription: "Reduce Energy Upgrade 13 effect but Matter gain softcap starts later",
                        done(){
                                return player.incrementy_o.total.gte(3)
                        },
                },
                3: {
                        requirementDescription: "<b>Cohen</b><br>Requires: 5 total Origins", 
                        effectDescription: "Automate SP challenge 3-4 challenge points",
                        done(){
                                return player.incrementy_o.total.gte(5)
                        },
                },
                4: {
                        requirementDescription: "<b>Smale</b><br>Requires: 8 total Origins", 
                        effectDescription: "Automate SP challenge 3-4 completions",
                        done(){
                                return player.incrementy_o.total.gte(8)
                        },
                },
                5: {
                        requirementDescription: "<b>Thompson</b><br>Requires: 13 total Origins", 
                        effectDescription: "Boson gain is better and +10 Boson challenge completion limit",
                        done(){
                                return player.incrementy_o.total.gte(13)
                        },
                },
                6: {
                        requirementDescription: "<b>Bombieri</b><br>Requires: 21 total Origins", 
                        effectDescription: "Pion effect is better. Unlock Origin Buyables.",
                        done(){
                                return player.incrementy_o.total.gte(21)
                        },
                },
        },
        tabFormat: {
                "Upgrades": {
                        content: [
                                "main-display",
                                "prestige-button",
                                "resource-display",
                                "upgrades"
                        ],
                        unlocked(){
                                return true
                        },
                },
                "Buyables": {
                        content: [
                                "main-display",
                                "buyables",
                        ],
                        unlocked(){
                                return true
                        },
                },
                "Milestones": {
                        content: [
                                "main-display",
                                "milestones",
                        ],
                        unlocked(){
                                return true
                        },
                },
        },
	passiveGeneration(){
		if(hasUpgrade("incrementy_o",12))return player.incrementy_o.upgrades.length;
		return 0;
	},
})


