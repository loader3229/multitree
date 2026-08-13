
addLayer("dynas_c", {
    name: "dynas_c", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		total: new Decimal(0),
		best: new Decimal(0),
    }},
    color: "#FFFF00",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "coins", // Name of prestige currency
    baseResource: "dynas points", // Name of resource prestige is based on
    baseAmount() {return player.modpoints[9]}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
       let mult = new Decimal(1)
		mult=mult.mul(tmp.dynas_b.effect);
		mult=mult.mul(tmp.dynas_m.effect);
		if(hasUpgrade("tptc_p",51))mult=mult.mul(upgradeEffect("tptc_p",51));
		if(hasUpgrade("incrementy_pi",14))mult=mult.mul(upgradeEffect("incrementy_pi",14));
					if(hasUpgrade("dynas_sp",13))mult=mult.mul(upgradeEffect("dynas_sp",13));
		return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
		let mult = new Decimal(1)
		if (player.dynas_b.banking & 4) mult = mult.mul(0.1)
		if (inChallenge("dynas_t", 11)) mult = mult.mul(0.5)
        	return mult
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [],
    layerShown(){return player.tm.currentTree==9;},
		
		doReset(l){
			if(!l.startsWith("dynas_")){return;}
			for(var i in tmp.dynas_c.upgrades){
				tmp.dynas_c.upgrades[i].effect=new Decimal(1);
			}
			if(l=="dynas_c" || !l.startsWith("dynas_")){return;}
			layerDataReset("dynas_c",["upgrades","milestones","challenges"]);
			return;
		},
		upgrades: {
            rows: 4,
            cols: 5,
			11: {
				title: "Coin Upgrade 11",
                description() {
					return "Gain "+format(this.effect())+" Dynas Points per second."
				},
                cost: new Decimal(0),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					let ret = new Decimal(1);
					if(hasUpgrade("dynas_c",12))ret=ret.mul(upgradeEffect("dynas_c",12));
					if(hasUpgrade("dynas_c",21))ret=ret.mul(upgradeEffect("dynas_c",21));
					if(hasUpgrade("dynas_c",31))ret=ret.mul(upgradeEffect("dynas_c",31));
					if(hasUpgrade("dynas_sp",11))ret=ret.mul(upgradeEffect("dynas_sp",11));
					if(hasUpgrade("dynas_wi",11))ret=ret.mul(upgradeEffect("dynas_wi",11));
					ret=ret.mul(tmp.dynas_w.effect);
		ret=ret.mul(tmp.dynas_m.effect);
		ret=ret.mul(tmp.dynas_sp.effect);
		ret=ret.mul(tmp.dynas_so.effect);
					ret=ret.mul(tmp.dynas_wf.effect2[0]);
					ret = ret.mul(buyableEffect("dynas_b",11));
					ret = ret.mul(buyableEffect("dynas_b",12));
					ret = ret.mul(buyableEffect("dynas_b",13));
					ret = ret.mul(buyableEffect("dynas_bd",12));
		if ((player.dynas_b.banking & 1) || inChallenge("dynas_t",31)) ret = ret.pow(0.5)
	if ((player.dynas_b.banking & 2) || inChallenge("dynas_t",31)) ret = ret.root(3)
	if (player.dynas_b.banking & 4) ret = ret.pow(0.1)
	if (player.dynas_b.banking & 8) ret = player.dynas_c.points.pow(0.1).add(10).min(1e200)
	if (player.dynas_b.banking & 16) ret = ret.pow(Decimal.pow(player.dynas_b.bankTime, 2).add(1).recip())  
		if (inChallenge("dynas_t", 11)) ret = ret.pow(0.5)
                    return ret;
                },
			},
			12: {
				title: "Coin Upgrade 12",
                description() {
					return "Coin Upgrade 11 is boosted by your coin amount."
				},
                cost: new Decimal(1),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
                    let base=2;
                    let ret = Decimal.pow(base,Decimal.log10(player.dynas_c.points.add(10)).pow(0.9));
					if(hasUpgrade("dynas_w",12))ret=ret.pow(upgradeEffect("dynas_w",12));
					if(hasUpgrade("dynas_c",13))ret=ret.mul(upgradeEffect("dynas_c",13));
					if(hasUpgrade("dynas_c",21))ret=ret.mul(upgradeEffect("dynas_c",21));
					if(hasUpgrade("dynas_wi",11))ret=ret.mul(upgradeEffect("dynas_wi",11));
					ret=ret.mul(tmp.dynas_wf.effect2[0]);
					ret = ret.mul(buyableEffect("dynas_bd",12));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			13: {
				title: "Coin Upgrade 13",
                description() {
					return "Coin Upgrade 12 is boosted by your points."
				},
                cost: new Decimal(1),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					if ((player.dynas_b.banking & 2) || inChallenge("dynas_t",31))return new Decimal(1);
                    let base=1.1;
                    let ret = Decimal.pow(base,Decimal.log10(player.points.add(1)).pow(hasUpgrade("dynas_c",45)?0.25:hasUpgrade("dynas_c",44)?0.24:hasUpgrade("dynas_c",43)?0.235:hasUpgrade("dynas_w",15)?0.225:hasUpgrade("dynas_w",13)?0.2:hasUpgrade("dynas_c",35)?0.175:hasUpgrade("dynas_c",32)?0.15:hasUpgrade("dynas_c",24)?0.125:0.1));
					if(hasUpgrade("dynas_c",14))ret=ret.mul(upgradeEffect("dynas_c",14));
					if(hasUpgrade("dynas_c",21))ret=ret.mul(upgradeEffect("dynas_c",21));
					if(hasUpgrade("dynas_wi",11))ret=ret.mul(upgradeEffect("dynas_wi",11));
					ret=ret.mul(tmp.dynas_wf.effect2[0]);
					ret = ret.mul(buyableEffect("dynas_bd",12));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			14: {
				title: "Coin Upgrade 14",
                description() {
					return "Coin Upgrade 13 is boosted by your dynas points."
				},
                cost: new Decimal(5),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					if ((player.dynas_b.banking & 2) || inChallenge("dynas_t",31))return new Decimal(1);
                    let base=1.5;
                    let ret = Decimal.pow(base,Decimal.log10(player.modpoints[9].add(1)).pow(0.9));
					ret = ret.mul(buyableEffect("dynas_bd",12));
					if(hasUpgrade("dynas_wi",11))ret=ret.mul(upgradeEffect("dynas_wi",11));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			15: {
				title: "Coin Upgrade 15",
                description() {
					return "Boost your point gain based on your dynas points."
				},
                cost: new Decimal(10),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					if ((player.dynas_b.banking & 2) || inChallenge("dynas_t",31))return new Decimal(1);
					let ret=player.modpoints[9];
					if(ret.gte('1e1000'))ret = ret.pow(0.5).mul('1e500');
					if(hasUpgrade("dynas_c",41))ret=ret.add(1).pow(3.5e8);
					else ret=ret.add(1).pow(3.5e6);
					if(hasUpgrade("dynas_sp",12))ret=ret.pow(upgradeEffect("dynas_sp",12));
					ret = ret.min("e5e13");
					return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			21: {
				title: "Coin Upgrade 21",
                description() {
					return "Coin Upgrades 11-13 are boosted by your dynas points."
				},
                cost: new Decimal(20),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					if ((player.dynas_b.banking & 2) || inChallenge("dynas_t",31))return new Decimal(1);
                    let base=1.5;
					if(hasUpgrade("dynas_c",33))base+=0.1;
                    let ret = Decimal.pow(base,Decimal.log10(player.modpoints[9].add(1)).pow(0.9));
					if(hasUpgrade("dynas_c",42))ret=ret.pow(1.1);
					if(hasUpgrade("dynas_c",22))ret=ret.mul(upgradeEffect("dynas_c",22));
					if(hasUpgrade("dynas_c",31))ret=ret.mul(upgradeEffect("dynas_c",31));
					ret=ret.mul(tmp.dynas_wf.effect2[0]);
					if(hasUpgrade("dynas_w",11))ret=ret.pow(upgradeEffect("dynas_w",11));
					ret = ret.mul(buyableEffect("dynas_bd",12));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			22: {
				title: "Coin Upgrade 22",
                description() {
					return "Coin Upgrade 21 is boosted by your coin amount."
				},
                cost: new Decimal(100),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					if ((player.dynas_b.banking & 2) || inChallenge("dynas_t",31))return new Decimal(1);
                    let base=1.2;
                    let ret = Decimal.pow(base,Decimal.log10(player.dynas_c.points.add(1)).pow(0.9));
					if(hasUpgrade("dynas_c",23))ret=ret.mul(upgradeEffect("dynas_c",23));
					ret=ret.mul(tmp.dynas_wf.effect2[0]);
					ret = ret.mul(buyableEffect("dynas_bd",12));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			23: {
				title: "Coin Upgrade 23",
                description() {
					return "Coin Upgrade 22 is boosted by your coin amount."
				},
                cost: new Decimal(1000),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					if ((player.dynas_b.banking & 2) || inChallenge("dynas_t",31))return new Decimal(1);
                    let base=1.1;
                    let ret = Decimal.pow(base,Decimal.log10(player.dynas_c.points.add(1)).pow(0.9));
					ret=ret.mul(tmp.dynas_wf.effect2[0]);
					ret = ret.mul(buyableEffect("dynas_bd",12));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			24: {
				title: "Coin Upgrade 24",
                description() {
					return "Coin Upgrade 13 is better."
				},
                cost: new Decimal(5000),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			25: {
				title: "Coin Upgrade 25",
                description() {
					return "Super-Generators in TPTC are cheaper."
				},
                cost: new Decimal(100000),
                unlocked() { return true; }, // The upgrade is only visible when this is true
			},
			31: {
				title: "Coin Upgrade 31",
                description() {
					return "Boost Coin Upgrades 11 & 21 based on your best worker count."
				},
                cost: new Decimal(1e7),
                unlocked() { return hasMilestone("dynas_w",0); }, // The upgrade is only visible when this is true
				effect() {
					if ((player.dynas_b.banking & 2) || inChallenge("dynas_t",31))return new Decimal(1);
					let ret=player.dynas_w.best.pow(1/3).div(2).add(1);
					if(hasUpgrade("dynas_w",11))ret=ret.pow(upgradeEffect("dynas_w",11));
                    return ret;
                },
                effectDisplay() { return format(this.effect())+"x" }, // Add formatting to the effect
			},
			32: {
				title: "Coin Upgrade 32",
                description() {
					return "Coin Upgrade 13 is better."
				},
                cost: new Decimal(1e8),
                unlocked() { return hasMilestone("dynas_w",0); }, // The upgrade is only visible when this is true
			},
			33: {
				title: "Coin Upgrade 33",
                description() {
					return "Coin Upgrade 21 is better."
				},
                cost: new Decimal(1e11),
                unlocked() { return hasMilestone("dynas_w",0); }, // The upgrade is only visible when this is true
			},
			34: {
				title: "Coin Upgrade 34",
                description() {
					return "Unlock a new prestige upgrade in TPTC."
				},
                cost: new Decimal(1e14),
                unlocked() { return hasMilestone("dynas_w",0); }, // The upgrade is only visible when this is true
			},
			35: {
				title: "Coin Upgrade 35",
                description() {
					return "Coin Upgrade 13 is better."
				},
                cost: new Decimal(1e18),
                unlocked() { return hasMilestone("dynas_w",0); }, // The upgrade is only visible when this is true
			},
			41: {
				title: "Coin Upgrade 41",
                description() {
					return "Coin Upgrade 15 is better."
				},
                cost: new Decimal(1e27),
                unlocked() { return hasMilestone("dynas_w",1); }, // The upgrade is only visible when this is true
			},
			42: {
				title: "Coin Upgrade 42",
                description() {
					return "Base effect of Coin Upgrade 21 boost itself."
				},
                cost: new Decimal(1e50),
                unlocked() { return hasMilestone("dynas_w",1); }, // The upgrade is only visible when this is true
			},
			43: {
				title: "Coin Upgrade 43",
                description() {
					return "Coin Upgrade 13 is better."
				},
                cost: new Decimal('e2e3'),
                unlocked() { return player.tm.buyables[9].gte(10); }, // The upgrade is only visible when this is true
			},
			44: {
				title: "Coin Upgrade 44",
                description() {
					return "Coin Upgrade 13 is better."
				},
                cost: new Decimal('e5e3'),
                unlocked() { return player.tm.buyables[9].gte(10); }, // The upgrade is only visible when this is true
			},
			45: {
				title: "Coin Upgrade 45",
                description() {
					return "Coin Upgrade 13 is better."
				},
                cost: new Decimal('ee4'),
                unlocked() { return player.tm.buyables[9].gte(10); }, // The upgrade is only visible when this is true
			},
		},
		update(diff){
			if(hasUpgrade("dynas_c",11))player.modpoints[9]=player.modpoints[9].add(upgradeEffect("dynas_c",11).mul(diff));
		},
	passiveGeneration(){
		if(hasMilestone("dynas_m",0))return 100;
		if(hasMilestone("dynas_wf",0))return 10;
		return 0;
	}
});


addLayer("dynas_wf", {
    name: "dynas_wf", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "WF", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		workUndone: new Decimal(0),
		workDone: new Decimal(0),
    }},
    color: "#555555",
    requires: new Decimal(1e20), // Can be a function that takes requirement increases into account
    resource: "workfinders", // Name of prestige currency
    baseResource: "coins", // Name of resource prestige is based on
    baseAmount() {return player.dynas_c.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	base: 5000,
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
	if(inChallenge("dynas_t",12) || inChallenge("dynas_t",21) || inChallenge("dynas_t",22))return Decimal.dInf;
        mult = new Decimal(1)
		return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [],
    layerShown(){return player.tm.currentTree==9 && player.tm.buyables[9].gte(3);},
		
	effect() {
		let eff = player.dynas_wf.points.pow(1.25);
		if(hasUpgrade("dynas_wf",23))eff = eff.mul(5);
		if(hasUpgrade("dynas_wf",32))eff = eff.mul(hasUpgrade("dynas_wf",34)?2:1.5);
		eff = eff.mul(buyableEffect("dynas_bd", 11));
		eff = eff.mul(buyableEffect("dynas_wf", 21));
		eff = eff.mul(buyableEffect("dynas_wf", 23));
		if (hasUpgrade("dynas_wf", 33)) eff = eff.mul(upgradeEffect("dynas_wf", 33));
		if(hasUpgrade("dynas_sp",15))eff = eff.mul(upgradeEffect("dynas_sp",15));
		if(hasMilestone("dynas_m",1))eff = eff.mul(10);
		if(hasChallenge("dynas_t",12))eff = eff.mul(challengeEffect("dynas_t",12));
		return eff
	},
	effect2() {
		let wd=player.dynas_wf.workDone;
		let wu=player.dynas_wf.workUndone;
		
		let wue = wu.add(1).log(1e10).add(1).cbrt().recip();//.pow(tmp.buyables.dynas_wf[23].effect)
		if(hasUpgrade("dynas_wf",25))wue = wue.sqrt();
		if(hasMilestone("dynas_m",1))wue = new Decimal(1);

		wue = wue.max(0.001);
		let wde = wd.add(1).pow(0.1).pow(wue).pow(tmp.dynas_wf.buyables[22].effect)
		if(hasMilestone("dynas_t",2))wde = wde.mul(5);
		else if(hasUpgrade("dynas_wf",21))wde = wde.mul(wue.pow(3).add(1));
		if ((player.dynas_b.banking & 1) || inChallenge("dynas_t",31)) wde = wde.pow(0.5)
		return [wde,wue]
	},
	effectDescription() {
		let eff=this.effect();
		return "which are generating " + format(eff) + " unfinished work per second.";
	},



	branches: [["dynas_c", 1]],

		doReset(l){
			if(l=="dynas_c" || l=="dynas_wf"  || l=="dynas_b" || l=="dynas_sp" || !l.startsWith("dynas_")){return;}
			layerDataReset("dynas_wf",["upgrades","milestones","challenges"]);
			return;
		},
		update(diff){
			player.dynas_wf.workUndone = player.dynas_wf.workUndone.add(this.effect().mul(diff));
			let w=layers.dynas_w.effect2().mul(diff).min(player.dynas_wf.workUndone);
			player.dynas_wf.workDone = player.dynas_wf.workDone.add(w);
			player.dynas_wf.workUndone = player.dynas_wf.workUndone.sub(w);
			if(player.tm.buyables[9].gte(16)){
				if(player.dynas_wf.workDone.gte(layers.dynas_wf.buyables[11].cost()))player.dynas_wf.buyables[11]=player.dynas_wf.buyables[11].add(1);
				if(player.dynas_wf.workDone.gte(layers.dynas_wf.buyables[12].cost()))player.dynas_wf.buyables[12]=player.dynas_wf.buyables[12].add(1);
				if(player.dynas_wf.workDone.gte(layers.dynas_wf.buyables[13].cost()))player.dynas_wf.buyables[13]=player.dynas_wf.buyables[13].add(1);
				if(player.dynas_wf.points.gte(layers.dynas_wf.buyables[21].cost()))player.dynas_wf.buyables[21]=player.dynas_wf.buyables[21].add(1);
				if(player.dynas_wf.workDone.gte(layers.dynas_wf.buyables[22].cost()))player.dynas_wf.buyables[22]=player.dynas_wf.buyables[22].add(1);
				if(player.dynas_wf.workDone.gte(layers.dynas_wf.buyables[23].cost()))player.dynas_wf.buyables[23]=player.dynas_wf.buyables[23].add(1);

			}
		},
	
	
	milestones: {
		0: {
			requirementDescription: () => "1 Workfinder",
			done() { return player.dynas_wf.best.gte(1) },
			effectDescription: () => "Gain 1000% of coin gain per second."
		},
		1: {
			requirementDescription: () => "TDT Level 16",
			done() { return player.tm.buyables[9].gte(16) },
			effectDescription: () => "Workfinder buyables are cheaper, and autobuy them."
		},
	},
	
	
	upgrades: {
		rows: 3,
		cols: 5,
		11: {
				title: "Workfinder Upgrade 11",
				description: "Finish work faster based on unfinished work count.",
				cost: new Decimal(250),
				unlocked() { return player.tm.buyables[9].gte(4) },
				effect() {
					let ret = new Decimal(1).add(player.dynas_wf.workUndone).max(1).log(100).add(1)
					if(hasUpgrade('dynas_wf',31))ret = new Decimal(1e6).add(player.dynas_wf.workUndone).max(1).log(100).add(1);
					if(hasMilestone("dynas_t", 2))ret = layers.dynas_wf.effect().div(2).add(player.dynas_wf.workUndone).max(1).log(100).add(5);
					return ret;
				},
				effectDisplay() { return "x" + format(this.effect()) },
		},
		12: {
				title: "Workfinder Upgrade 12",
				description: "Finish work faster based on finished work's effect.",
				cost: new Decimal(500),
				unlocked() { return player.tm.buyables[9].gte(4) },
				effect() {
					let ret = Decimal.log(new Decimal(1).add(tmp.dynas_wf.effect2[0]).max(1), 10).add(1)
					return ret;
				},
				effectDisplay() { return "x" + format(this.effect()) },
		},
		13: {
				title: "Workfinder Upgrade 13",
				description: "Finish work faster based on workfinders.",
				cost: new Decimal(750),
				unlocked() { return player.tm.buyables[9].gte(4) },
				effect() {
					let ret = player.dynas_wf.points.pow(hasUpgrade("dynas_wf",22)?0.2:hasUpgrade("dynas_wf",15)?0.08:hasUpgrade("dynas_wf",14)?0.06:0.05).add(1);
					return ret;
				},
				effectDisplay() { return "x" + format(this.effect()) },
		},
		14: {
				title: "Workfinder Upgrade 14",
				description: "Previous upgrade is better.",
				cost: new Decimal(1000),
				unlocked() { return player.tm.buyables[9].gte(4) },
		},
		15: {
				title: "Workfinder Upgrade 15",
				description: "Previous upgrade is better.",
				cost: new Decimal(1250),
				unlocked() { return player.tm.buyables[9].gte(4) },
		},
		21: {
				title: "Workfinder Upgrade 21",
			description: "Multiplier to finished work's effect based on unfinished work's effect.",
				cost: new Decimal(10000),
			effect() {
			if(hasMilestone("dynas_t",2))return new Decimal(5);
				let ret = Decimal.pow(player.dynas_wf.workUndone.add(1).log(1e10).add(1).cbrt().recip(),3).add(1)
			if(hasUpgrade("dynas_wf",25))ret = Decimal.pow(player.dynas_wf.workUndone.add(1).log(1e10).add(1).root(6).recip(),3).add(1)
			if(hasMilestone("dynas_m",1))ret = new Decimal(2);
				return ret;
			},
				effectDisplay() { return "x" + format(this.effect()) },
				unlocked() { return player.tm.buyables[9].gte(6) },
		},
		22: {
				title: "Workfinder Upgrade 22",
			description: "Workfinder Upgrade 13 is better",
				cost: new Decimal(15000),
				unlocked() { return player.tm.buyables[9].gte(6) },
		},
		23: {
				title: "Workfinder Upgrade 23",
			description: "Find work 5 times faster.",
				cost: new Decimal(24000),
				unlocked() { return player.tm.buyables[9].gte(8) },
		},
		24: {
				title: "Workfinder Upgrade 24",
			description: "Unlock a button to clear works.",
				cost: new Decimal(27000),
				unlocked() { return player.tm.buyables[9].gte(9) },
		},
		25: {
				title: "Workfinder Upgrade 25",
			description: "Unfinished work's effect is reduced.",
				cost: new Decimal(34500),
				unlocked() { return player.tm.buyables[9].gte(10) },
		},
		31: {
				title: "Workfinder Upgrade 31",
			description: "Workfinder Upgrade 11's effect is better.",
				cost: new Decimal(65536),
				unlocked() { return player.tm.buyables[9].gte(11) },
		},
		32: {
				title: "Workfinder Upgrade 32",
			description(){
				if(hasUpgrade("dynas_wf",34))return "Find work 2 times faster.";
				return "Find work 1.5 times faster.";
			},
				cost: new Decimal(66666),
				unlocked() { return player.tm.buyables[9].gte(11) },
		},
		33: {
				title: "Workfinder Upgrade 33",
				description: "Find & Finish work faster based on finished work.",
				cost: new Decimal(77500),
				unlocked() { return player.tm.buyables[9].gte(12) },
				effect() {
					let ret = player.dynas_wf.workDone.add(10).log10();
					return ret;
				},
				effectDisplay() { return "x" + format(this.effect()) },
		},
		34: {
				title: "Workfinder Upgrade 34",
			description: "Workfinder Upgrade 32 is better, \"Increase workfinders' strength\" buyable is cheaper.",
				cost: new Decimal(81000),
				unlocked() { return player.tm.buyables[9].gte(12) },
		},
		35: {
				title: "Workfinder Upgrade 35",
			description: "Finish work faster based on work finding/finishing speed.",
				cost: new Decimal(86000),
			effect() {
				let ret=layers.dynas_wf.effect().div(layers.dynas_w.effect2().max(1)).max(0).sqrt().mul(1.1);
				if(hasUpgrade("dynas_wf",35))ret=ret.pow(2);
				return ret.max(1.1);
			},
				effectDisplay() { return "x" + format(this.effect()) },
				unlocked() { return player.tm.buyables[9].gte(12) },
		},
	},


	buyables: {
		rows: 2,
		cols: 3,
		11: {
			title: () => "Increase workers' strength",
			cost(x=player.dynas_wf.buyables[11]) {
				if (x.gte(10)) x = x.pow(x.div(hasMilestone("dynas_wf",1)?11:10).max(1))
				let cost = Decimal.pow(10, x).mul(hasMilestone("dynas_m",2)?1:1000)
				return cost.floor()
			},
			effect(x=player.dynas_wf.buyables[11]) { // Effects of owning x of the items, x is a decimal
				if (!tmp[this.layer].buyables[12]) return Decimal.pow(1.35, x)

				let eff = new Decimal(1)
				if (tmp[this.layer].buyables[12].effect.add)
					eff = Decimal.pow(tmp[this.layer].buyables[12].effect.add(1.35), x)
				if (tmp[this.layer].buyables[13])
					eff = eff.pow(tmp[this.layer].buyables[13].effect)

				return eff;
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return "Level " + player[this.layer].buyables[this.id] + "\n\
				Cost: " + format(data.cost) + " finished work\n\
				Increases work finishing speed by ×" + format(tmp[this.layer].buyables[12].effect.add ? tmp[this.layer].buyables[12].effect.add(1.35) : 1.35) + " per level.\n\
				Currently: ×" + format(data.effect)
			},
			unlocked() { return player.tm.buyables[9].gte(8) },
			canAfford() {
				return player[this.layer].workDone.gte && player[this.layer].workDone.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				cost = tmp[this.layer].buyables[this.id].cost
				player[this.layer].workDone = player[this.layer].workDone.sub(cost)
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
			},
		},
		12: {
			title: () => "Increase workers' dexterity",
			cost(x=player.dynas_wf.buyables[12]) {
				if (x.gte(10)) x = x.pow(x.div(hasMilestone("dynas_wf",1)?11:10).max(1))
				let cost = Decimal.pow(10, x).mul(hasMilestone("dynas_m",2)?1:2000)
				return cost.floor()
			},
			effect(x=player.dynas_wf.buyables[12]) { // Effects of owning x of the items, x is a decimal
				let eff = x.mul(0.01)
				return eff;
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return "Level " + player[this.layer].buyables[this.id] + "\n\
				Cost: " + format(data.cost) + " finished work\n\
				Increases the previous increase upgrade by +0.01 per level per level.\n\
				Currently: +" + format(data.effect)
			},
			unlocked() { return player.tm.buyables[9].gte(9) },
			canAfford() {
				return player[this.layer].workDone.gte && player[this.layer].workDone.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				cost = tmp[this.layer].buyables[this.id].cost
				player[this.layer].workDone = player[this.layer].workDone.sub(cost)
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
			},
		},
		13: {
			title: () => "Increase workers' collaborativeness",
			cost(x=player.dynas_wf.buyables[13]) {
				if (x.gte(10)) x = x.pow(x.div(hasMilestone("dynas_wf",1)?11:10).max(1))
				let cost = Decimal.pow(hasMilestone("dynas_wf",1)?10:20, x).mul(hasMilestone("dynas_m",2)?1:5000)
				return cost.floor()
			},
			effect(x=player.dynas_wf.buyables[13]) { // Effects of owning x of the items, x is a decimal
				let eff = x.mul(0.01).add(1)
				return eff;
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return "Level " + player[this.layer].buyables[this.id] + "\n\
				Cost: " + format(data.cost) + " finished work\n\
				Increases the first upgrade's effect by ^+0.01 per level. Levels on this upgrade stack additively.\n\
				Currently: ^" + format(data.effect)
			},
			unlocked() { return player.tm.buyables[9].gte(11) },
			canAfford() {
				return player[this.layer].workDone.gte && player[this.layer].workDone.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				cost = tmp[this.layer].buyables[this.id].cost
				player[this.layer].workDone = player[this.layer].workDone.sub(cost)
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
			},
		},
		21: {
			title: () => "Increase workfinders' strength",
			cost(x=player.dynas_wf.buyables[21]) {
				let cost = Decimal.pow(x.add(hasMilestone("dynas_m",2)?50:hasUpgrade("dynas_wf",34)?61:100), x.sqrt()).mul(hasMilestone("dynas_m",2)?1:hasUpgrade("dynas_wf",34)?7:10)
				if(hasMilestone("dynas_t",2))cost = Decimal.pow(32, x.sqrt());
				if(hasMilestone("dynas_wf",1))cost = Decimal.pow(16, x.sqrt());
				return cost.floor()
			},
			effect(x=player.dynas_wf.buyables[21]) { // Effects of owning x of the items, x is a decimal
				let eff = Decimal.pow(1.1, x)
				return eff;
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return "Level " + player[this.layer].buyables[this.id] + "\n\
				Cost: " + format(data.cost) + " workfinders\n\
				Increases work finding speed by ×" + format(1.1) + " per level.\n\
				Currently: ×" + format(data.effect)
			},
			unlocked() { return player.tm.buyables[9].gte(12) },
			canAfford() {
				return player[this.layer].points.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				cost = tmp[this.layer].buyables[this.id].cost
				player[this.layer].points = player[this.layer].points.sub(cost)
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
			},
		},
		22: {
			title: () => "Increase work quality",
			cost(x=player.dynas_wf.buyables[22]) {
				if (x.gte(10)) x = x.pow(x.div(hasMilestone("dynas_wf",1)?11:10).max(1))
				let cost = Decimal.pow(10, x).mul(hasMilestone("dynas_wf",1)?1:hasMilestone("dynas_m",2)?1e9:1e12)
				return cost.floor()
			},
			effect(x=player.dynas_wf.buyables[22]) { // Effects of owning x of the items, x is a decimal
				let eff = x.mul(0.4).add(1).cbrt()
				return eff;
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return "Level " + player[this.layer].buyables[this.id] + "\n\
				Cost: " + format(data.cost) + " finished work\n\
				Boosts the finished work's effect.\n\
				Currently: ^" + format(data.effect)
			},
			unlocked() { return player.tm.buyables[9].gte(13) },
			canAfford() {
				return player[this.layer].workDone.gte && player[this.layer].workDone.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				cost = tmp[this.layer].buyables[this.id].cost
				player[this.layer].workDone = player[this.layer].workDone.sub(cost)
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
			},
		},
		23: {
			title: () => "Increase worker-workfinder synergy",
			cost(x) {
				if (x.gte(10)) x = x.pow(x.div(hasMilestone("dynas_wf",1)?11:10).max(1))
				let cost = Decimal.pow(10, x).mul(hasMilestone("dynas_wf",1)?1:1e15)
				return cost.floor()
			},
			effect(x) { // Effects of owning x of the items, x is a decimal
				let eff = Decimal.pow(x.add(1), 1.5);
				return eff;
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return "Level " + player[this.layer].buyables[this.id] + "\n\
				Cost: " + format(data.cost) + " finished work\n\
				Increases work finding and finishing speed.\n\
				Currently: ×" + format(data.effect)
			},
			unlocked() { return hasMilestone("dynas_m",2) },
			canAfford() {
				return player[this.layer].workDone.gte && player[this.layer].workDone.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				cost = tmp[this.layer].buyables[this.id].cost
				player[this.layer].workDone = player[this.layer].workDone.sub(cost)
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
			},
		},
	},

	clickables: {
            1: {
                title: "Reset Work", // Optional, displayed at the top in a larger font
                display: "Reset Finished & Unfinished Work",
                unlocked() {return hasUpgrade("dynas_wf",24);}, 
				canClick: true,
				onClick(){
					player[this.layer].workDone=new Decimal(0);
					player[this.layer].workUndone=new Decimal(0);
				},
                style: {'height':'100px','width':'150px'},
            },
	},

canBuyMax: true,
resetsNothing: () => hasMilestone("dynas_w",2),
autoPrestige: () => hasMilestone("dynas_w",2),


	 tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    ["blank", "5px"],
                    ["display-text",
                        function() {
							return 'You have '+format(player.dynas_wf.workDone)+' finished work, which are multiplying Coin Upgrades 11-13 and 21-23 by '+format(tmp.dynas_wf.effect2[0])+'.';
						},
                        {}],
                    ["display-text",
                        function() {
							return 'You have '+format(player.dynas_wf.workUndone)+' unfinished work, which are raising finished work\'s effect by ^'+format(tmp.dynas_wf.effect2[1])+'.';
						},
                        {}],
			["display-text",
				function () { if(player.tm.buyables[9].lt(8))return "More Buyable at The Dynas Tree Level 8";if(player.tm.buyables[9].lt(9))return "More Buyable at The Dynas Tree Level 9";if(player.tm.buyables[9].lt(11))return "More Buyable at The Dynas Tree Level 11";return "" }],
						"milestones",
						["clickable",1],
						"buyables",
						"upgrades"
				],
});


addLayer("dynas_w", {
    name: "dynas_w", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(1e6), // Can be a function that takes requirement increases into account
    resource: "workers", // Name of prestige currency
    baseResource: "coins", // Name of resource prestige is based on
    baseAmount() {return player.dynas_c.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	base: 15000,
    exponent: 1.35, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
	if(inChallenge("dynas_t",22))return Decimal.dInf;
        mult = new Decimal(1)
		return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [],
    layerShown(){return player.tm.currentTree==9 && player.tm.buyables[9].gte(2);},
		
	effect() {
		let eff = Decimal.pow(player.dynas_w.points.add(1), 2)
		if(hasMilestone("dynas_w",3))eff = eff.pow(3)
		if(hasMilestone("dynas_w",4))eff = eff.pow(3)
		if ((player.dynas_b.banking & 1) || inChallenge("dynas_t",31)) eff = eff.pow(0.5)

		return eff
	},
	effectDescription() {
		let eff=this.effect();
		if(player.tm.buyables[9].gte(3))return "which are boosting your dynas point gains by ×" + format(eff) +" and finishing "+format(this.effect2())+" work per second.";
		return "which are boosting your dynas point gains by ×" + format(eff)
	},

effect2(){
	let eff = Decimal.pow(player.dynas_w.points, 1.25).mul(10);
	
					if (hasUpgrade("dynas_wf", 11)) eff = eff.mul(upgradeEffect("dynas_wf", 11));
					if (hasUpgrade("dynas_wf", 12)) eff = eff.mul(upgradeEffect("dynas_wf", 12));
					if (hasUpgrade("dynas_wf", 13)) eff = eff.mul(upgradeEffect("dynas_wf", 13));
					eff = eff.mul(buyableEffect("dynas_wf", 11));
					eff = eff.mul(buyableEffect("dynas_wf", 23));

					
					eff = eff.mul(buyableEffect("dynas_bd", 11));
		if(hasUpgrade("dynas_sp",15))eff = eff.mul(upgradeEffect("dynas_sp",15));
		if (hasUpgrade("dynas_wf", 33)) eff = eff.mul(upgradeEffect("dynas_wf", 33));
		if(hasChallenge("dynas_t",12))eff = eff.mul(challengeEffect("dynas_t",12));
		if (hasUpgrade("dynas_wf", 35)) eff = eff.mul(1.1);
		if (hasUpgrade("dynas_wf", 35)) eff = eff.max(eff.mul(1.1).mul(layers.dynas_wf.effect()).sqrt());

		if (player.dynas_b.banking == 15) eff = player.modpoints[9].pow(0.2).sub(1)
	return eff;
},


	branches: [["dynas_c", 1],["dynas_b", 1],["dynas_wf", 1]],
		doReset(l){
			if(l=="dynas_c" || l=="dynas_w" || l=="dynas_wf"  || l=="dynas_b" || l=="dynas_sp" || !l.startsWith("dynas_")){return;}
			layerDataReset("dynas_w",["upgrades","milestones","challenges"]);
			return;
		},
		upgrades: {
			rows: 2,
			cols: 5,
			11: {
				title: "Worker Upgrade 11",
				description: "Boost Coin Upgrades 21 & 31 based on your best worker count.",
				cost: new Decimal(3),
				unlocked() { return hasMilestone("dynas_w", 1) },
				effect() {
					let ret = player[this.layer].best.div(20).add(1);
					if (hasUpgrade(this.layer, 14)) ret = ret.add(player[this.layer].points.div(30));
					
					if (ret.gte(2.3))ret = ret.mul(2.3).sqrt();
					if (ret.gte(2.9))ret = ret.mul(2.9).sqrt();
					return ret.sqrt();
				},
				effectDisplay() { return "^" + format(this.effect()) },
			},
			12: {
				title: "Worker Upgrade 12",
				description: "Boost base effect of Coin Upgrade 12 based on your best worker count.",
				cost: new Decimal(4),
				unlocked() { return hasMilestone("dynas_w", 1) },
				effect() {
					let ret = player[this.layer].best.div(20).add(1);
					if (ret.gte(4))ret = ret.mul(4).sqrt();
					return ret.pow(1/6);
				},
				effectDisplay() { return "^" + format(this.effect()) },
			},
			13: {
				title: "Worker Upgrade 13",
				description: "Coin Upgrade 13 is better.",
				cost: new Decimal(5),
				unlocked() { return hasMilestone("dynas_w", 1) },
			},
			14: {
				title: "Worker Upgrade 14",
				description: "The current worker count also contibutes to the first upgrade's formula.",
				cost: new Decimal(9),
				unlocked() { return hasMilestone("dynas_w", 1) },
			},
			15: {
				title: "Worker Upgrade 15",
				description: "Coin Upgrade 13 is better.",
				cost: new Decimal(53),
				unlocked() { return hasMilestone("dynas_w", 1) },
			},
		},
		update(diff){
			
		},
	
	
	milestones: {
		0: {
			requirementDescription: () => "1 Worker",
			done() { return player[this.layer].best.gte(1) },
			effectDescription: () => "Unlocks a new row of coin upgrades."
		},
		1: {
			requirementDescription: () => "3 Workers",
			done() { return player[this.layer].best.gte(3) },
			effectDescription: () => "Unlocks worker upgrades.",
		},
		2: {
			requirementDescription: () => "13 Workers",
			done() { return player[this.layer].best.gte(13) },
			effectDescription: () => "Hiring workfinders no longer resets anything. Auto-Hire workfinders.",
		},
		3: {
			requirementDescription: () => "22 Workers",
			done() { return player[this.layer].best.gte(22) },
			effectDescription: () => "The workers' effect gets cubed.",
		},
		4: {
			requirementDescription: () => "27 Workers",
			done() { return player[this.layer].best.gte(27) },
			effectDescription: () => "The workers' effect gets cubed again. Yay!",
		},
		5: {
			requirementDescription: () => "30 Workers",
			done() { return player[this.layer].best.gte(30) },
			effectDescription: () => "Banks no longer resets anything, Auto-build banks",
		},
		6: {
			requirementDescription: () => "35 Workers",
			done() { return player[this.layer].best.gte(35) },
			effectDescription: () => "You can buy max workers",
		},
	},

canBuyMax: () => hasMilestone("dynas_w",6),
autoPrestige: () => hasMilestone("dynas_m",0),
resetsNothing: () => hasMilestone("dynas_m",0),
});


addLayer("dynas_b", {
	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0),
			banking: 0,
			bankTime: new Decimal(0),
			speed: new Decimal(0),
		}
	},
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

    layerShown(){return player.tm.currentTree==9 && player.tm.buyables[9].gte(4);},

	color: () => "#00FF00",
	resource: "banks",
	row: 1,

	baseResource: "dynas points",
	baseAmount() { return player.modpoints[9] },

	requires: () => new Decimal('1e600'),

	type: "static",
	base: 50000,
	exponent: 1.25,
canBuyMax: () => hasMilestone("dynas_w",5),
resetsNothing: () => (hasMilestone("dynas_w",5) && player.dynas_b.banking==0),
autoPrestige: () => hasMilestone("dynas_w",5),

	effect() {
		if(inChallenge("dynas_t",21) || inChallenge("dynas_t",22))return new Decimal(1);
		var eff = Decimal.pow(16, player.dynas_b.points)
		if ((player.dynas_b.banking & 1) || inChallenge("dynas_t",31)) eff = eff.pow(0.5)
		return eff
	},
	effectDescription() {
		var eff = this.effect();
		return "which are boosting your coin gains by ×" + format(eff)
	},

	gainMult() {
	if(inChallenge("dynas_t",21) || inChallenge("dynas_t",22))return Decimal.dInf;
		return new Decimal(1)
	},
	gainExp() {
		return new Decimal(1)
	},
		doReset(l){
			if(l=="dynas_c" || l=="dynas_wf" || l=="dynas_b" || l=="dynas_sp" || !l.startsWith("dynas_")){return;}
			if(hasMilestone("dynas_m",2))layerDataReset("dynas_b",["upgrades","buyables","milestones","challenges"]);
			else layerDataReset("dynas_b",["upgrades","milestones","challenges"]);
			return;
		},
	buyables: {
		rows: 3,
		cols: 3,
		11: {
			title: () => "Coin Banking",
			cost(x) {
				return new Decimal(0)
			},
			effect(x) {
				if(inChallenge("dynas_t",21) || inChallenge("dynas_t",22))return new Decimal(1);
				var eff = player[this.layer].buyables[this.id].add(1).pow(0.15)
				eff = eff.mul(buyableEffect("dynas_b",21))
				eff = eff.mul(buyableEffect("dynas_b",22))
				eff = eff.mul(buyableEffect("dynas_b",23))
				eff = eff.mul(buyableEffect("dynas_b",31))
				//if (hasMilestone("m", 0) && hasMilestone("w", 9)) eff = eff.mul(25)
				//if (hasUpg("w", 25)) eff = eff.pow(layers.w.upgrades[25].effect())
				//if (hasUpg("wi", 22)) eff = eff.mul(layers.wi.upgrades[22].effect())
				var softcap = new Decimal(1e45)
				//if (player.sp.buyables[30].gt(0)) softcap = softcap.mul(tmp.buyables.sp[30].effect)
				if (eff.gte(softcap)) eff = eff.mul(softcap).sqrt()
				//if (player.sp.buyables[28].gt(0) && tmp.buyables.sp[28].effect.sqrt) eff = eff.mul(tmp.buyables.sp[28].effect.sqrt())
				return eff
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return data.canAfford
					? "You have " + format(player[this.layer].buyables[this.id]) + " banked coins, which are boosting the dynas point generation speed by ×" + format(data.effect) + ".\n\n\
						Banking is currently " + (player.dynas_b.banking == 1 ? "enabled.\n\
						Click here to disable banking and gain " + format(player.dynas_c.points.sub(player.dynas_b.buyables[11]).max(0)) + " banked coins." : "disabled.\n\
						Click here to enable banking, which will square root all of your dynas point generation speed, workers' effect, finished works' effects, banks' effects.")
					: (player.dynas_b.banking > 0 ? "Please disable the current active banking before you can activate another one." : "You need to build at least 2 banks before you can use this function.")
			},
			unlocked() { return player.tm.buyables[9].gte(7) },
			canAfford() { return (player[this.layer].best.gte(2) /*|| player[this.layer].buyables[33].gt(0)*/) && (player[this.layer].banking == 0 || player[this.layer].banking == 1) },
			buy() {
				if (player.dynas_b.banking == 1) player.dynas_b.buyables[11] = player.dynas_b.buyables[11].max(player.dynas_c.points)
				player.dynas_b.banking = player.dynas_b.banking == 1 ? 0 : 1
			tmp[this.layer].resetsNothing=false
				doReset(this.layer, true)
			},
		},
		12: {
			title: () => "Dynas Point Banking",
			cost(x) {
				return new Decimal(0)
			},
			effect(x) {
				if(inChallenge("dynas_t",21) || inChallenge("dynas_t",22))return new Decimal(1);
				var eff = player[this.layer].buyables[this.id].add(1).pow(0.15)
				eff = eff.mul(buyableEffect("dynas_b",21))
				eff = eff.mul(buyableEffect("dynas_b",22))
				eff = eff.mul(buyableEffect("dynas_b",23))
				eff = eff.mul(buyableEffect("dynas_b",31))
				//if (hasMilestone("m", 0) && hasMilestone("w", 9)) eff = eff.mul(25)
				//if (hasUpg("w", 25)) eff = eff.pow(layers.w.upgrades[25].effect())
				//if (hasUpg("wi", 22)) eff = eff.mul(layers.wi.upgrades[22].effect())
				var softcap = new Decimal(1e45)
				//if (player.sp.buyables[30].gt(0)) softcap = softcap.mul(tmp.buyables.sp[30].effect)
				if (eff.gte(softcap)) eff = eff.mul(softcap).sqrt()
				//if (player.sp.buyables[28].gt(0) && tmp.buyables.sp[28].effect.sqrt) eff = eff.mul(tmp.buyables.sp[28].effect.sqrt())
				return eff
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return data.canAfford
					? "You have " + format(player[this.layer].buyables[this.id]) + " banked dynas points, which are boosting the dynas point generation speed by ×" + format(data.effect) + ".\n\n\
						Banking is currently " + (player.dynas_b.banking == 2 ? "enabled.\n\
						Click here to disable banking and gain " + format(player.modpoints[9].sub(player.dynas_b.buyables[12]).max(0)) + " banked dynas points." : "disabled.\n\
						Click here to enable banking, which will cube root your dynas point generation speed and coin upgrades are disabled except first two.")
					: (player.dynas_b.banking > 0 ? "Please disable the current active banking before you can activate another one." : "You need to build at least 4 banks before you can use this function.")
			},
			unlocked() { return player.tm.buyables[9].gte(7) },
			canAfford() { return (player[this.layer].best.gte(4) /*|| player[this.layer].buyables[33].gt(0)*/) && (player[this.layer].banking == 0 || player[this.layer].banking == 2) },
			buy() {
				if (player.dynas_b.banking == 2) player.dynas_b.buyables[12] = player.dynas_b.buyables[12].max(player.modpoints[9])
				player.dynas_b.banking = player.dynas_b.banking == 2 ? 0 : 2
			tmp[this.layer].resetsNothing=false
				doReset(this.layer, true)
			},
		},
		13: {
			title: () => "Time Banking",
			cost(x) {
				return new Decimal(0)
			},
			effect(x) {
				if(inChallenge("dynas_t",21) || inChallenge("dynas_t",22))return new Decimal(1);
				var eff = player[this.layer].buyables[this.id].add(1).pow(0.15)
				eff = eff.mul(buyableEffect("dynas_b",21))
				eff = eff.mul(buyableEffect("dynas_b",22))
				eff = eff.mul(buyableEffect("dynas_b",23))
				eff = eff.mul(buyableEffect("dynas_b",31))
				//if (hasMilestone("m", 0) && hasMilestone("w", 9)) eff = eff.mul(25)
				//if (hasUpg("w", 25)) eff = eff.pow(layers.w.upgrades[25].effect())
				//if (hasUpg("wi", 22)) eff = eff.mul(layers.wi.upgrades[22].effect())
				var softcap = new Decimal(1e45)
				//if (player.sp.buyables[30].gt(0)) softcap = softcap.mul(tmp.buyables.sp[30].effect)
				if (eff.gte(softcap)) eff = eff.mul(softcap).sqrt()
				//if (player.sp.buyables[28].gt(0) && tmp.buyables.sp[28].effect.sqrt) eff = eff.mul(tmp.buyables.sp[28].effect.sqrt())
				return eff
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return data.canAfford
					? "You have " + format(player[this.layer].buyables[this.id]) + " banked time, which are boosting the dynas point generation speed by ×" + format(data.effect) + ".\n\n\
						Banking is currently " + (player.dynas_b.banking == 3 ? "enabled.\n\
						Click here to disable banking and gain " + format(Decimal.sub(upgradeEffect("dynas_c",11), player.dynas_b.buyables[13]).max(0)) + " banked time." : "disabled.\n\
						Click here to enable banking, which will activate all of the previous banking debuffs at once. The thing you are banking here is your dynas points generated per second.")
					: (player.dynas_b.banking > 0 ? "Please disable the current active banking before you can activate another one." : "You need to build at least 6 banks before you can use this function.")
			},
			unlocked() { return player.tm.buyables[9].gte(9) },
			canAfford() { return (player[this.layer].best.gte(6) /*|| player[this.layer].buyables[33].gt(0)*/) && (player[this.layer].banking == 0 || player[this.layer].banking == 3) },
			buy() {
				if (player.dynas_b.banking == 3) player.dynas_b.buyables[13] = player.dynas_b.buyables[13].max(upgradeEffect("dynas_c",11))
				player.dynas_b.banking = player.dynas_b.banking == 3 ? 0 : 3
			tmp[this.layer].resetsNothing=false
				doReset(this.layer, true)
			},
		},
		21: {
			title: () => "Metacoin Banking",
			cost(x) {
				return new Decimal(0)
			},
			effect(x) {
				if(inChallenge("dynas_t",21) || inChallenge("dynas_t",22))return new Decimal(1);
				var eff = player[this.layer].buyables[this.id].mul(2.5).add(1).pow(0.1)
				eff = eff.mul(buyableEffect("dynas_b",22))
				eff = eff.mul(buyableEffect("dynas_b",23))
				eff = eff.mul(buyableEffect("dynas_b",31))
				var softcap = new Decimal(1e15)
				//if (player.sp.buyables[30].gt(0)) softcap = softcap.mul(tmp.buyables.sp[30].effect)
				if (eff.gte(softcap)) eff = eff.mul(softcap).sqrt()
				//if (player.sp.buyables[28].gt(0) && tmp.buyables.sp[28].effect.sqrt) eff = eff.mul(tmp.buyables.sp[28].effect.sqrt())
				return eff
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return data.canAfford
					? "You have " + format(player[this.layer].buyables[this.id]) + " banked metacoins, which are boosting all previous bankings' buffs by ×" + format(data.effect) + ".\n\n\
						Banking is currently " + (player.dynas_b.banking == 4 ? "enabled.\n\
						Click here to disable banking and gain " + format(Decimal.sub(tmp.dynas_c.resetGain, player.dynas_b.buyables[21]).max(0)) + " banked metacoins." : "disabled.\n\
						Click here to enable banking, which will tenth root your dynas point generation and coin gains. The thing you are banking here is your coins gain on coin reset.")
					: (player.dynas_b.banking > 0 ? "Please disable the current active banking before you can activate another one." : "You need to build at least 12 banks before you can use this function.")
			},
			unlocked() { return player.tm.buyables[9].gte(12) },
			canAfford() { return (player[this.layer].best.gte(12) /*|| player[this.layer].buyables[33].gt(0)*/) && (player[this.layer].banking == 0 || player[this.layer].banking == 4) },
			buy() {
				if (player.dynas_b.banking == 4) player.dynas_b.buyables[21] = player.dynas_b.buyables[21].max(tmp.dynas_c.resetGain)
				player.dynas_b.banking = player.dynas_b.banking == 4 ? 0 : 4
			tmp[this.layer].resetsNothing=false
			tmp.dynas_c.resetGain=new Decimal(0)
				doReset(this.layer, true)
			},
		},
		22: {
			title: () => "Metapoint Banking",
			cost(x) {
				return new Decimal(0)
			},
			effect(x) {
				if(inChallenge("dynas_t",21) || inChallenge("dynas_t",22))return new Decimal(1);
				var eff = player[this.layer].buyables[this.id].mul(2.5).add(1).pow(0.05)
				eff = eff.mul(buyableEffect("dynas_b",23))
				eff = eff.mul(buyableEffect("dynas_b",31))
				var softcap = new Decimal(1e15)
				//if (player.sp.buyables[30].gt(0)) softcap = softcap.mul(tmp.buyables.sp[30].effect)
				if (eff.gte(softcap)) eff = eff.mul(softcap).sqrt()
				//if (player.sp.buyables[28].gt(0) && tmp.buyables.sp[28].effect.sqrt) eff = eff.mul(tmp.buyables.sp[28].effect.sqrt())
				return eff
			},
			display() {
				let data = tmp[this.layer].buyables[this.id]
				return data.canAfford
					? "You have " + format(player[this.layer].buyables[this.id]) + " banked metapoints, which are boosting all previous bankings' buffs by ×" + format(data.effect) + ".\n\n\
						Banking is currently " + (player.dynas_b.banking == 8 ? "enabled.\n\
						Click here to disable banking and gain " + format(Decimal.sub(upgradeEffect("dynas_c",11), player.dynas_b.buyables[22]).max(0), 0) + " banked metapoints." : "disabled.\n\
						Click here to enable banking, which will override the point generation speed and make it stronger based on your current coin count ((coins^0.1), hardcap is 1e200). You also bank point generated per second on this one.")
					: (player.dynas_b.banking > 0 ? "Please disable the current active banking before you can activate another one." : "You need to build at least 15 banks before you can use this function.")
			},
			unlocked() { return hasMilestone("dynas_m", 1) },
			canAfford() { return (player[this.layer].best.gte(15) /*|| player.b.buyables[33].gt(0)*/) && (player[this.layer].banking == 0 || player[this.layer].banking == 8) },
			buy() {
				if (player.dynas_b.banking == 8) player.dynas_b.buyables[22] = player.dynas_b.buyables[22].max(upgradeEffect("dynas_c",11))
				player.dynas_b.banking = player.dynas_b.banking == 8 ? 0 : 8
				doReset(this.layer, true)
			},
		},
		23: {
			title: () => "Work Banking",
			cost(x) {
				return new Decimal(0)
			},
			effect(x) {
				if(inChallenge("dynas_t",21) || inChallenge("dynas_t",22))return new Decimal(1);
				var eff = player[this.layer].buyables[this.id].mul(2.5).add(1).pow(0.6)
				eff = eff.mul(buyableEffect("dynas_b",31))
				var softcap = new Decimal(1e15)
				//if (player.sp.buyables[30].gt(0)) softcap = softcap.mul(tmp.buyables.sp[30].effect)
				if (eff.gte(softcap)) eff = eff.mul(softcap).sqrt()
				//if (player.sp.buyables[28].gt(0) && tmp.buyables.sp[28].effect.sqrt) eff = eff.mul(tmp.buyables.sp[28].effect.sqrt())
				return eff
			},
			display() {
				let data = tmp[this.layer].buyables[this.id]
				if(hasMilestone("dynas_m",4))return  "You have " + format(player[this.layer].buyables[this.id], 0) + " banked work, which are boosting all previous bankings' buffs by ×" + format(data.effect) + ".\nThis banking can only gained passively.";
				return data.canAfford
					? "You have " + format(player[this.layer].buyables[this.id], 0) + " banked work, which are which are boosting all previous bankings' buffs by ×" + format(data.effect) + ".\n\n\
						Banking is currently " + (player.dynas_b.banking == 15 ? "enabled.\n\
						Click here to disable banking and gain " + format(Decimal.sub(player.dynas_wf.workDone, player.dynas_b.buyables[23]).max(0), 0) + " banked work." : "disabled.\n\
						Click here to enable banking, which will activate all the previous bankings' debuffs at once. Your current finished and unfinished work are also resetted, and the finished work's speed is overriden and depends on your current point count ((points^0.2)-1). The thing you're banking here is your current finished work count.")
					: (player.dynas_b.banking > 0 ? "Please disable the current active banking before you can activate another one." : "You need to build at least 19 banks before you can use this function.")
			},
			unlocked() { return hasMilestone("dynas_t", 0) },
			canAfford() { return (player[this.layer].best.gte(19) /*|| player.b.buyables[33].gt(0)*/) && (player[this.layer].banking == 0 || player[this.layer].banking == 15) && !hasMilestone("dynas_m",4) },
			buy() {
				if (player.dynas_b.banking == 15) player[this.layer].buyables[23] = player[this.layer].buyables[23].max(player.dynas_wf.workDone)
				player.dynas_b.banking = player.dynas_b.banking == 15 ? 0 : 15
				player.dynas_wf.workDone = new Decimal(0)
				player.dynas_wf.workUndone = new Decimal(0)
				doReset(this.layer, true)
			},
		},
		31: {	
			title:() => "Speed Banking",	
			cost(x) {	
				return new Decimal(0)	
			},	
			effect(x) { 	
				if(inChallenge("dynas_t",21) || inChallenge("dynas_t",22))return new Decimal(1);
				var eff = player[this.layer].buyables[this.id].add(1).pow(0.6)	
				//if (player.sp.buyables[28].gt(0) && tmp.buyables.sp[28].effect.sqrt) eff = eff.mul(tmp.buyables.sp[28].effect.sqrt())
				return eff	
			},	
			display() { 	
				let data = tmp[this.layer].buyables[this.id]	
				return  "You have " + format(player[this.layer].buyables[this.id], 0) + " banked speed, which are boosting all previous bankings' buffs by ×" + format(data.effect) + ".\nThis banking can only gained passively.";	
			},	
			unlocked() { return player.dynas_t.challenges[21]>=1 }, 	
			canAfford() { return false },	
			buy() { 	
			},	
		},
		32: {	
			title:() => "Production Banking",	
			cost(x) {	
				return new Decimal(0)	
			},	
			effect(x) { 	
				var eff = player[this.layer].buyables[this.id].add(1).pow(0.5).mul(10)	
				return eff	
			},	
			display() { 	
				let data = tmp[this.layer].buyables[this.id]	
				return  "You have " + format(player[this.layer].buyables[this.id], 0) + " banked production, which are boosting previous bankings' generation speed by ×" + format(data.effect) + ".\nThis banking can only gained passively.";	
			},	
			unlocked() { return player.dynas_t.challenges[21]>=2 || hasMilestone("dynas_m", 3); }, 	
			canAfford() { return false },	
			buy() { 	
			},	
		},
		33: {	
			title:() => "Generation Banking",	
			cost(x) {	
				return new Decimal(0)	
			},	
			effect(x) { 	
				var eff = player[this.layer].buyables[this.id].add(1).pow(0.5).mul(10)	
				return eff	
			},	
			display() { 	
				let data = tmp[this.layer].buyables[this.id]	
				if(hasMilestone("dynas_m",4))return  "You have " + format(player[this.layer].buyables[this.id], 0) + " banked generation, which are boosting previous bankings' generation speed by ×" + format(data.effect) + ".\nThis banking can only gained passively.";	
				return  "You have " + format(player[this.layer].buyables[this.id], 0) + " banked generation, which are boosting previous bankings' generation speed by ×" + format(data.effect) + ".\nThis banking is set to your banks when clicked.";	
			},	
			unlocked() { return player.dynas_t.challenges[21]>=2 && hasMilestone("dynas_m", 3); }, 	
			canAfford() { return player[this.layer].buyables[33].lt(player.dynas_b.points) && !hasMilestone("dynas_m",4)},	
			buy() { 
				player[this.layer].buyables[33] = player[this.layer].buyables[33].max(player.dynas_b.points)
				player.dynas_wf.workDone = new Decimal(0)
				player.dynas_wf.workUndone = new Decimal(0)
				doReset(this.layer, true)
			},	
		},
	},
	update(diff) {
		if (player.dynas_b.banking == 0) player.dynas_b.bankTime = new Decimal(0)
		else player.dynas_b.bankTime = Decimal.add(player.dynas_b.bankTime, diff)		
		if (hasMilestone("dynas_m", 2)) {
			let curr = 11;
			for (var a = 1; a <= 6 + player.dynas_t.challenges[21]; a++) {
				let layer = Math.floor(a / 3 + 1) * 10 + ((a % 3) + 1)
				let realMult = new Decimal(10);
				if((player.dynas_t.challenges[21]>=2 || hasMilestone("dynas_m", 3)) && a <= 7) realMult = realMult.mul(buyableEffect("dynas_b",32));
				if((player.dynas_t.challenges[21]>=2 && hasMilestone("dynas_m", 3)) && a <= 8) realMult = realMult.mul(buyableEffect("dynas_b",33));
				if(hasMilestone("dynas_m",4))realMult = realMult.mul(player.dynas_m.points);
				if (hasUpgrade("dynas_sp",22)) realMult = realMult.mul(upgradeEffect("dynas_sp",22))
				//if (tmp.buyables.wi[12]) realMult = realMult.mul(tmp.buyables.wi[12].effect.pow(Math.pow(0.7, a-1)))
				
				player.dynas_b.buyables[curr] = player.dynas_b.buyables[curr].add(Decimal.mul(new Decimal(player.dynas_b.buyables[layer] || 0).add(1), diff).mul(realMult))
				curr = layer
			}
			if(hasMilestone("dynas_m",4)){
				player.dynas_b.buyables[31+player.dynas_t.challenges[21]] = player.dynas_b.buyables[31+player.dynas_t.challenges[21]].add(player.dynas_b.points.mul(diff).mul(player.dynas_m.points).mul(hasUpgrade("dynas_sp",22)?upgradeEffect("dynas_sp",22):1));
			}
		}
		if(hasMilestone("dynas_m",3))player.dynas_b.buyables[32]=player.dynas_b.buyables[32].max(100);
		
		//if (inChallenge("t", 31)) player.b.banking = 3
		//if (inChallenge("t", 32)) player.b.banking = 4
	},

	tabFormat:
		["main-display",
			["prestige-button", function () { return "Build " }],
			["blank", "5px"],
			["display-text",
				function () { return "You have at best " + format(player.dynas_b.best, 0) + " " + " banks." }],
			["display-text",
				function () { return player.dynas_b.banking > 0 ? ("You have been banking for " + formatTime(player.dynas_b.bankTime.toNumber()) + (".")) : "" }],
			["blank", "5px"],
			["display-text",
				function () { return "<h3>Bankings</h3><br/><h5>Note: Enabling/Disabling bankings will force a bank reset.<br/>Total multiplier to dynas point generation: ×" + format(tmp.dynas_b.buyables[11].effect.mul(tmp.dynas_b.buyables[12].effect).mul(tmp.dynas_b.buyables[13].effect)) + "</h5>" }],
			"buyables",
			["display-text",
				function () { if(player.tm.buyables[9].lt(7))return "More Banking at The Dynas Tree Level 7";if(player.tm.buyables[9].lt(9))return "More Banking at The Dynas Tree Level 9";if(player.tm.buyables[9].lt(12))return "More Banking at The Dynas Tree Level 12";return player.dynas_b.banking & 16 ? ("You have " + format(player.dynas_b.speed) + " speed.") : "" }],
			, "milestones", "upgrades"],
/*
	hotkeys: [
		{ key: "b", desc: "B: Build banks", onPress() { doReset(this.layer) } },
	],*/

})

addLayer("dynas_m", {
	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0),
			autoWorkerReset: false,
			autoWorkfinderReset: false,
			allocated: 0,
			landsAvailable: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			landsAllocated: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		}
	},

    layerShown(){return player.tm.currentTree==9 && player.tm.buyables[9].gte(5);},

	name: "manager",
	color: () => "#77FFFF",
	resource: "managers",
	row: 3,
	symbol: "M",

	baseResource: "banks",
	baseAmount() { return player["dynas_b"].points },
	branches: [["dynas_w", 1], ["dynas_b", 1]],

	requires: () => new Decimal(50),

	type: "static",
	base: 1.22727,
	exponent: 1.01,
	canBuyMax: () => false,
	resetsNothing: () => false,
	
	effect() {
		var eff = Decimal.pow(64, player.dynas_m.points).pow(2)
		//eff = eff.pow(tmp.buyables.wi[14].effect.second)
		return eff
	},
	effectDescription() {
		eff = this.effect()
		return "which are boosting your coin and dynas point gains by ×" + format(eff)
	},

	gainMult() {
		return new Decimal(1)
	},
	gainExp() {
		return new Decimal(1)
	},
		doReset(l){
			if(l=="dynas_c" || l=="dynas_wf"  || l=="dynas_b" || l=="dynas_sp" || l=="dynas_w" || l=="dynas_m" || l=="dynas_bd" || l=="dynas_t" || l=="dynas_so" || l=="dynas_wi" || !l.startsWith("dynas_")){return;}
			layerDataReset("dynas_m",["upgrades","milestones","challenges"]);
			return;
		},
	milestones: {
		0: {
			requirementDescription: () => "1 Manager",
			done() { return player[this.layer].best.gte(1) },
			effectDescription: () => "You can bulk hire workers, workfinders and banks, workers and workfinders unlocks immediately, gain 10,000% of your coins gain on coin reset every second, and coin reset no longer reset anything. Auto-hire workers. Workers resets nothing."
		},
		1: {
			requirementDescription: () => "10 Managers",
			done() { return player[this.layer].best.gte(10) },
			effectDescription: () => "Unfinished work won't have any negative effect now, and unfinished work gain x10"
		},
		2: {
			requirementDescription: () => "11 Managers",
			done() { return player[this.layer].best.gte(11) },
			effectDescription: () => "Keep bankings in all resets. Also generate 10 each of first 6 banking per second, multiplied by (1 + banking above it). Workfinder buyables are cheaper and unlock a new workfinder buyable."
		},
		3: {
			requirementDescription: () => "12 Managers",
			done() { return player[this.layer].best.gte(12) },
			effectDescription: () => "Gain 100% of SP gain per second. SP requirement is reduced. Unlock a new banking."
		},
		4: {
			requirementDescription: () => "13 Managers",
			done() { return player[this.layer].best.gte(13) },
			effectDescription: () => "Banks generate last banking, and multiply all banking generation by managers. Work banking can only be gained passively now."
		},
		5: {
			requirementDescription: () => "14 Managers",
			done() { return player[this.layer].best.gte(14) },
			effectDescription: () => "Managers boost Dynas Magic gain."
		},
	},	
	microtabs: {
		stuff: {
			milestones: { title: () => "Milestones",  content: [
				"milestones"
			]},
		}
	},
	tabFormat:
		["main-display",
			["prestige-button", function () { return "Hire " }],
			["blank", "5px"],
			["display-text",
				function () { return "You have at best " + format(player.dynas_m.best, 0) + " " + " managers." }],
			["blank", "5px"], ["microtabs", "stuff"],
		],
/*
	hotkeys: [
		{ key: "m", desc: "M: Hire managers", onPress() { doReset(this.layer) } },
	],
*/
})


addLayer("dynas_bd", {
	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0),
			allocated: new Decimal(1),
			building: 0,
			progress: new Decimal(0),
		}
	},

	layerShown() { return player.tm.buyables[9].gte(10) && player.tm.currentTree==9; },

		doReset(l){
			if(l=="dynas_c" || l=="dynas_wf"  || l=="dynas_b" || l=="dynas_sp" || l=="dynas_w" || l=="dynas_m" || l=="dynas_bd" || l=="dynas_t" || l=="dynas_so" || l=="dynas_wi" || !l.startsWith("dynas_")){return;}
			layerDataReset("dynas_bd",["upgrades","milestones","challenges"]);
			return;
		},
		
	color: () => "#FFFF77",
	resource: "builders",
	row: 3,
	symbol:"BD",

	baseResource: "workers",
	baseAmount() { return player.dynas_w.points },
	branches: [["dynas_w", 1]],

	requires: () => new Decimal(80),

	effect() {
		let ret = Decimal.pow(player.dynas_bd.points, 2).mul(player.dynas_c.points.add(1).log(100).add(1)).div(5);
		if(hasUpgrade("dynas_sp",14))ret=ret.mul(upgradeEffect("dynas_sp",14));
		if(player.dynas_t.challenges[11]>=1)ret=ret.mul(challengeEffect("dynas_t",11));
		ret=ret.mul(buyableEffect("dynas_bd",22));
		return ret;
	},

	effectDescription() {
		return "which are providing "+format(this.effect())+" Building Speed (based on coins)";
	},

	type: "static",
	base: 1.25,
	exponent: 1.01,
	canBuyMax: () => false,

	gainMult() {
		return new Decimal(1)
	},
	gainExp() {
		return new Decimal(1)
	},
	
	milestones: {
		0: {
			requirementDescription: () => "5 Builders",
			done() { return player[this.layer].best.gte(5) && player.tm.buyables[9].gte(15) },
			unlocked() { return player.tm.buyables[9].gte(15) },
			effectDescription: () => "Reduce costs of first 3 buildings. Also reduce SP requirement."
		},
	},

	buyables: {
		rows: 3,
		cols: 3,
		11: {
			title: () => "Tavern",
			cost(x=player.dynas_bd.buyables[11]) {
				if (x.gte(25)) x = x.pow(2).div(25)
				if (x.gte(15)) x = x.pow(2).div(15)
				if(hasMilestone("dynas_bd", 0))return Decimal.pow(2, x);
				return Decimal.pow(2, x).mul(1000)
			},
			effect(x=player.dynas_bd.buyables[11]) {
				return Decimal.pow(1.2, x)
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return data.canAfford
					? "You have " + format(player[this.layer].buyables[this.id], 0) + " taverns, which are boosting the find and finish work speed by ×" + format(data.effect) + "." + 
						(player.dynas_bd.building == 11 ? "\n\n\
						Progress: " + format(player.dynas_bd.progress, 0) + " / " + format(data.cost, 0) + " (" + format(Decimal.div(player.dynas_bd.progress, data.cost).mul(100)) + "%) \n\
						ETA: " + (Decimal.lte(tmp.dynas_bd.effect, 0) ? "never" : formatTime(data.cost.sub(player.dynas_bd.progress).div(tmp.dynas_bd.effect))) + "\n\
						Click here to stop building." : "\n\n\
						Progress needed: " + format(data.cost, 0) + "\n\
						Click here to start building.")
					: "You can not build more than one structure at once."
			},
			unlocked() { return player.dynas_bd.points.gte(1) },
			canAfford() { return (player.dynas_bd.building == 0 || player.dynas_bd.building == 11) },
			buy() {
				player.dynas_bd.building = (player.dynas_bd.building == 11 ? 0 : 11)
			},
		},
		12: {
			title: () => "Housing Area",
			cost(x=player.dynas_bd.buyables[12]) {
				if (x.gte(25)) x = x.pow(2).div(25)
				if (x.gte(15)) x = x.pow(2).div(15)
				if(hasMilestone("dynas_bd", 0))return Decimal.pow(1.5, x);
				return Decimal.pow(1.5, x).mul(800)
			},
			effect(x=player.dynas_bd.buyables[12]) {
				return Decimal.pow(1.2, x)
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return data.canAfford
					? "You have " + format(player[this.layer].buyables[this.id], 0) + " housing areas, which are boosting Coin Upgrade 11-14 & 21-23 by ×" + format(data.effect) + "." + 
						(player.dynas_bd.building == 12 ? "\n\n\
						Progress: " + format(player.dynas_bd.progress, 0) + " / " + format(data.cost, 0) + " (" + format(Decimal.div(player.dynas_bd.progress, data.cost).mul(100)) + "%) \n\
						ETA: " + (Decimal.lte(tmp.dynas_bd.effect, 0) ? "never" : formatTime(data.cost.sub(player.dynas_bd.progress).div(tmp.dynas_bd.effect))) + "\n\
						Click here to stop building." : "\n\n\
						Progress needed: " + format(data.cost, 0) + "\n\
						Click here to start building.")
					: "You can not build more than one structure at once."
			},
			unlocked() { return player.tm.buyables[9].gte(11) },
			canAfford() { return (player.dynas_bd.building == 0 || player.dynas_bd.building == 12) },
			buy() {
				player.dynas_bd.building = (player.dynas_bd.building == 12 ? 0 : 12)
			},
		},
		13: {
			title: () => "Shrine",
			cost(x=player.dynas_bd.buyables[13]) {
				if (x.gte(8)) x = x.pow(2).div(8)
				if (x.gte(5)) x = x.pow(2).div(5)
				if(hasMilestone("dynas_bd", 0))return Decimal.pow(3.5, x);
				return Decimal.pow(3.5, x).mul(8000)
			},
			effect(x=player.dynas_bd.buyables[13]) {
				return Decimal.pow(1.25, x)
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return data.canAfford
					? "You have " + format(player[this.layer].buyables[this.id], 0) + " shrines. Building more will make your spells stronger." + 
						(player.dynas_bd.building == 13 ? "\n\n\
						Progress: " + format(player.dynas_bd.progress, 0) + " / " + format(data.cost, 0) + " (" + format(Decimal.div(player.dynas_bd.progress, data.cost).mul(100)) + "%) \n\
						ETA: " + (Decimal.lte(tmp.dynas_bd.effect, 0) ? "never" : formatTime(data.cost.sub(player.dynas_bd.progress).div(tmp.dynas_bd.effect))) + "\n\
						Click here to stop building and discard the building progress." : "\n\n\
						Progress needed: " + format(data.cost, 0) + "\n\
						Click here to start building.")
					: "You can not build more than one structure at once."
			},
			unlocked() { return player.tm.buyables[9].gte(14) },
			canAfford() { return (player.dynas_bd.building == 0 || player.dynas_bd.building == 13) },
			buy() {
				player.dynas_bd.building = (player.dynas_bd.building == 13 ? 0 : 13)
			},
		},
		21: {
			title: () => "Road",
			cost(x=player.dynas_bd.buyables[21]) {
				if (x.gte(8)) x = x.pow(2).div(8)
				if (x.gte(5)) x = x.pow(2).div(5)
				return Decimal.pow(3.5, x).mul(60000)
			},
			effect(x=player.dynas_bd.buyables[21]) {
				return Decimal.pow(1.25, x)
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return data.canAfford
					? "You have " + format(player[this.layer].buyables[this.id], 0) + " roads. Building more will make your obstacle rewards stronger." + 
						(player.dynas_bd.building == 21 ? "\n\n\
						Progress: " + format(player.dynas_bd.progress, 0) + " / " + format(data.cost, 0) + " (" + format(Decimal.div(player.dynas_bd.progress, data.cost).mul(100)) + "%) \n\
						ETA: " + (Decimal.lte(tmp.dynas_bd.effect, 0) ? "never" : formatTime(data.cost.sub(player.dynas_bd.progress).div(tmp.dynas_bd.effect))) + "\n\
						Click here to stop building and discard the building progress." : "\n\n\
						Progress needed: " + format(data.cost, 0) + "\n\
						Click here to start building.")
					: "You can not build more than one structure at once."
			},
			unlocked() { return player.tm.buyables[9].gte(15) },
			canAfford() { return (player.dynas_bd.building == 0 || player.dynas_bd.building == 21) },
			buy() {
				player.dynas_bd.building = (player.dynas_bd.building == 21 ? 0 : 21)
			},

		},
		22: {
			title: () => "Construction Site",
			cost(x=player.dynas_bd.buyables[22]) {
				if (x.gte(25)) x = x.pow(2).div(25)
				if (x.gte(15)) x = x.pow(2).div(15)
				return Decimal.pow(1.6, x).mul(120000)
			},
			effect(x=player.dynas_bd.buyables[22]) {
				return Decimal.pow(1.2, x)
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return data.canAfford
					? "You have " + format(player[this.layer].buyables[this.id], 0) + " construction sites, which are making your builders build " + format(data.effect) + "× faster." + 
						(player.dynas_bd.building == 22 ? "\n\n\
						Progress: " + format(player.dynas_bd.progress, 0) + " / " + format(data.cost, 0) + " (" + format(Decimal.div(player.dynas_bd.progress, data.cost).mul(100)) + "%) \n\
						ETA: " + (Decimal.lte(tmp.dynas_bd.effect, 0) ? "never" : formatTime(data.cost.sub(player.dynas_bd.progress).div(tmp.dynas_bd.effect))) + "\n\
						Click here to stop building and discard the building progress." : "\n\n\
						Progress needed: " + format(data.cost, 0) + "\n\
						Click here to start building.")
					: "You can not build more than one structure at once."
			},
			unlocked() { return player.tm.buyables[9].gte(15) },
			canAfford() { return (player.dynas_bd.building == 0 || player.dynas_bd.building == 22) },
			buy() {
				player.dynas_bd.building = (player.dynas_bd.building == 22 ? 0 : 22)
			},
		},
		23: {
			title: () => "Military Base",
			cost(x=player.dynas_bd.buyables[23]) {
				if (x.gte(25)) x = x.pow(2).div(25)
				if (x.gte(15)) x = x.pow(2).div(15)
				return Decimal.pow(2, x).mul(250000000)
			},
			effect(x=player.dynas_bd.buyables[23]) {
				return Decimal.pow(1.2, x)
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return data.canAfford
					? "You have " + format(player[this.layer].buyables[this.id], 0) + " military bases." +  
						(player.dynas_bd.building == 23 ? "\n\n\
						Progress: " + format(player.dynas_bd.progress, 0) + " / " + format(data.cost, 0) + " (" + format(Decimal.div(player.dynas_bd.progress, data.cost).mul(100)) + "%) \n\
						ETA: " + (Decimal.lte(tmp.dynas_bd.effect, 0) ? "never" : formatTime(data.cost.sub(player.dynas_bd.progress).div(tmp.dynas_bd.effect))) + "\n\
						Click here to stop building and discard the building progress." : "\n\n\
						Progress needed: " + format(data.cost, 0) + "\n\
						Click here to start building.")
					: "You can not build more than one structure at once."
			},
			unlocked() { return player.tm.buyables[9].gte(17) },
			canAfford() { return (player.dynas_bd.building == 0 || player.dynas_bd.building == 23) },
			buy() {
				player.dynas_bd.building = (player.dynas_bd.building == 23 ? 0 : 23)
			},
		},/*
		31: {
			title: () => "School",
			cost(x) {
				if (x.gte(25)) x = x.pow(2).div(25)
				if (x.gte(15)) x = x.pow(2).div(15)
				return Decimal.pow(2, x).mul(1e9)
			},
			effect(x) {
				return Decimal.pow(1.2, x)
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp.buyables[this.layer][this.id]
				return data.canAfford
					? "You have " + format(player[this.layer].buyables[this.id], 0) + " schools." + (player[this.layer].buyables[this.id].gte(1) ? "" : " Building one will unlock another prestige layer.") + 
						(player.bd.building == 31 ? "\n\n\
						Progress: " + format(player.bd.progress, 0) + " / " + format(data.cost, 0) + " (" + format(Decimal.div(player.bd.progress, data.cost).mul(100)) + "%) \n\
						ETA: " + (Decimal.lte(tmp.layerEffs.bd.speed, 0) ? "never" : formatTime(data.cost.sub(player.bd.progress).div(tmp.layerEffs.bd.speed))) + "\n\
						Click here to stop building and discard the building progress." : "\n\n\
						Progress needed: " + format(data.cost, 0) + "\n\
						Click here to start building.")
					: "You can not build more than one structure at once."
			},
			unl() { return player.bd.points.gte(1) && hasMilestone("m", 7) },
			canAfford() { return (player.bd.building == 0 || player.bd.building == 31) },
			buy() {
				player.bd.building = (player.bd.building == 31 ? 0 : 31)
				if (player.bd.building != 0) doReset("bd", true)
			},
		},
		32: {
			title: () => "Placeholder.",
			cost(x) { return new Decimal("1ee308") },
			effect(x) { return new Decimal("1") },
			display() { return "" },
			unl() { return false },
			canAfford() { return false },
			buy() { },
		},
		33: {
			title: () => "Placeholder.",
			cost(x) { return new Decimal("1ee308") },
			effect(x) { return new Decimal("1") },
			display() { return "" },
			unl() { return false },
			canAfford() { return false },
			buy() { },
		},*/
	},
	
	update(diff) {
		if (player.dynas_bd.building)player.dynas_bd.progress = Decimal.add(player.dynas_bd.progress, Decimal.mul(tmp.dynas_bd.effect, diff))
		if (player.dynas_bd.building && player.dynas_bd.progress.gte(tmp.dynas_bd.buyables[player.dynas_bd.building].cost)) {
			player.dynas_bd.progress = player.dynas_bd.progress.sub(tmp.dynas_bd.buyables[player.dynas_bd.building].cost)
			player.dynas_bd.buyables[player.dynas_bd.building] = player.dynas_bd.buyables[player.dynas_bd.building].add(1)
		}
		if(hasUpgrade("dynas_sp",14))player.dynas_bd.progress = player.dynas_bd.progress.max(upgradeEffect("dynas_sp",14)[hasMilestone("dynas_t",0)?"mul":"add"](1e8));
	},   


	tabFormat:
		["main-display",
			["prestige-button", function () { return "Hire " }],
			["blank", "5px"],
			"resource-display",
			["blank", "5px"],
			"milestones",
			["blank", "5px"],
			["display-text",
				function () { return player.dynas_bd.points.gte(1) ? "<h3>Structures</h3>" : "" }],
			"buyables",
			["blank", "5px"],
			["display-text",
				function () { if(player.dynas_bd.points.lt(1))return "";if(player.tm.buyables[9].lt(11))return "More Structures at The Dynas Tree Level 11";if(player.tm.buyables[9].lt(14))return "More Structures at The Dynas Tree Level 14";if(player.tm.buyables[9].lt(15))return "More Structures at The Dynas Tree Level 15";if(player.tm.buyables[9].lt(17))return "More Structures at The Dynas Tree Level 17"; }],
			["blank", "5px"], 
			"upgrades"],


})


addLayer("dynas_sp", {
    name: "dynas_sp", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0),
			magic: new Decimal(0),
		}
	},
    	layerShown() { return player.dynas_bd.buyables[13].gte(1) && player.tm.currentTree==9},

	color: () => "#FF00FF",
	resource: "spiritual power",
	row: 1,
	branches: [["dynas_c", 1]],

	baseResource: "dynas points",
	baseAmount() { return player.modpoints[9] },

	requires(){
		if(hasMilestone("dynas_m",3))return new Decimal("1e4000");
		if(hasMilestone("dynas_bd", 0))return new Decimal("1e5000");
		return new Decimal("1e6300");
	},
	gainMult(){	
		if(inChallenge("dynas_t",22))return new Decimal(0);
		let ret=new Decimal(1);
		return ret
	},

	type: "normal",
	exponent: 0.01,

	effect() {
		var eff = player.dynas_sp.points.add(1)
		return eff
	},
	effectDescription() {
		eff = tmp.dynas_sp.effect;
		return "which are multiplying your dynas point gains by " + format(eff)
	},

		doReset(l){
			if(l=="dynas_c" || l=="dynas_wf"  || l=="dynas_b" || l=="dynas_sp" || !l.startsWith("dynas_")){return;}
			layerDataReset("dynas_sp",["upgrades","milestones","challenges"]);
			return;
		},
 tabFormat: ["main-display",
                    "prestige-button", "resource-display",
                    "blank",
                    ["display-text",
                        function() {
							return 'You have ' + format(player.dynas_sp.magic) + ' Dynas Magic. These spell\'s effects are based on your shrine and Dynas Magic.';
						},
                        {}],
						"milestones",
						"upgrades",
						"buyables"
				],
	buyables: {
		rows: 1,
		cols: 3,
		11: {
			title: () => "Convert spiritual power into castable magic fountain",
			cost(x) {
				let inc = 1.25
				let cost = Decimal.pow(2500, Decimal.pow(inc, x))
				return cost.floor()
			},
			effect(x) { 
				let ret=x.pow(2);
				if(hasUpgrade("dynas_sp",21))ret = ret.mul(upgradeEffect("dynas_sp",21));
				if(player.dynas_t.challenges[31]>=2)ret = ret.mul(player.dynas_bd.buyables[21].add(1));
				if(hasMilestone("dynas_t",7))ret = ret.mul(player.dynas_t.points.max(1));
				if(hasMilestone("dynas_m",5))ret = ret.mul(player.dynas_m.points.add(1));
				return ret;
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return "Level " + player[this.layer].buyables[this.id] + "\n\
				Cost: " + format(data.cost) + " spiritual power\n\
				Generates " + format(data.effect) + " magic every second."
			},
			unlocked() { return true },
			canAfford() {
				return player.dynas_sp.points.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				cost = tmp[this.layer].buyables[this.id].cost
				player.dynas_sp.points = player.dynas_sp.points.sub(cost)
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
			},
			style() {
				return {
					"height": "200px"
				}
			}
		},
		12: {
			title: () => "Use spiritual power to enchant basic spells",
			cost(x) {
				let cost = Decimal.pow(hasMilestone("dynas_t",4)?1e15:1e48, Decimal.pow(1.25, x))
				return cost.floor()
			},
			effect(x) { 
				return x.add(1).pow(2)
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return "Level " + player[this.layer].buyables[this.id] + "\n\
				Cost: " + format(data.cost) + " spiritual power\n\
				Increase the effective magic of the first three spells by ×" + format(data.effect) + "."
			},
			unlocked() { return hasMilestone("dynas_t",2) },
			canAfford() {
				return player.dynas_sp.points.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				cost = tmp[this.layer].buyables[this.id].cost
				player.dynas_sp.points = player.dynas_sp.points.sub(cost)
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
			},
			style() {
				return {
					"height": "200px"
				}
			}
		},
		13: {
			title: () => "Use spiritual power to enchant advanced spells",
			cost(x) {
				let cost = Decimal.pow(1e17, Decimal.pow(1.35, x))
				return cost.floor()
			},
			effect(x) { 
				return x.add(1).pow(2)
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return "Level " + player[this.layer].buyables[this.id] + "\n\
				Cost: " + format(data.cost) + " spiritual power\n\
				Increase the effective magic of the second three spells by ×" + format(data.effect) + "."
			},
			unlocked() { return hasChallenge("dynas_t",31); },
			canAfford() {
				return player.dynas_sp.points.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				cost = tmp[this.layer].buyables[this.id].cost
				player.dynas_sp.points = player.dynas_sp.points.sub(cost)
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
			},
			style() {
				return {
					"height": "200px"
				}
			}
		},
	},
		upgrades: {
            rows: 2,
            cols: 5,
			11: {
				title: "Dynas Spell 11",
                description() {
					return "Dynas point gain is multiplied by "+format(this.effect())+"."
				},
                cost: new Decimal(1e4),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					let ret = player.dynas_sp.magic.mul(buyableEffect("dynas_sp",12)).add(1).pow(player.dynas_bd.buyables[13]);  

                    return ret;
                },
			},
			12: {
				title: "Dynas Spell 12",
                description() {
					return "Coin Upgrade 15's effect ^"+format(this.effect())
				},
                cost: new Decimal(1e6),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					let ret = player.dynas_sp.magic.mul(buyableEffect("dynas_sp",12)).add(10).log10().log10().mul(player.dynas_bd.buyables[13]).div(5).add(1);  

                    return ret;
                },
			},
			13: {
				title: "Dynas Spell 13",
                description() {
					return "Coin gain is multiplied by "+format(this.effect())+"."
				},
                cost: new Decimal(1e7),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					let ret = player.dynas_sp.magic.mul(buyableEffect("dynas_sp",12)).add(1).pow(player.dynas_bd.buyables[13].div(2));  

                    return ret;
                },
			},
			14: {
				title: "Dynas Spell 14",
                description() {
					return "Your building progress won't lower than "+format(this.effect()[hasMilestone("dynas_t",0)?"mul":"add"](1e8))+", also builder speed x"+format(this.effect());
				},
                cost: new Decimal(1e8),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					let ret = player.dynas_sp.magic.mul(buyableEffect("dynas_sp",13)).add(1).log10().mul(player.dynas_bd.buyables[13]).add(1);
                    return ret;
                },
			},
			15: {
				title: "Dynas Spell 15",
                description() {
					return "Find and finish work speed x"+format(this.effect());
				},
                cost: new Decimal(1e9),
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					let ret = player.dynas_sp.magic.mul(buyableEffect("dynas_sp",13)).add(1).log10().mul(player.dynas_bd.buyables[13]).add(1);
                    return ret;
                },
			},
			21: {
				title: "Dynas Spell 21",
                description() {
					return "Dynas Magic gain is boosted by spiritual power (x"+format(this.effect())+")";
				},
                cost: new Decimal(1e100),
                unlocked() { return player.tm.buyables[9].gte(17); }, // The upgrade is only visible when this is true
				effect() {
					let ret = player.dynas_sp.magic.mul(buyableEffect("dynas_sp",13)).add(1).log10().mul(player.dynas_sp.points.add(1).log10()).mul(player.dynas_bd.buyables[13]).sqrt().add(1);
                    return ret;
                },
			},
			22: {
				title: "Dynas Spell 22",
                description() {
					return "Banking generation is boosted by x"+format(this.effect());
				},
                cost: new Decimal(1e125),
                unlocked() { return player.tm.buyables[9].gte(18); }, // The upgrade is only visible when this is true
				effect() {
					let ret = player.dynas_sp.magic.add(1).log10().mul(player.dynas_bd.buyables[13]).add(1);
                    return ret;
                },
			},
			23: {
				title: "Dynas Spell 23",
                description() {
					return "Soldier DPS is boosted by x"+format(this.effect());
				},
                cost: new Decimal(1e150),
                unlocked() { return player.tm.buyables[9].gte(18); }, // The upgrade is only visible when this is true
				effect() {
					let ret = player.dynas_sp.magic.pow(player.dynas_bd.buyables[13].cbrt()).add(1);
                    return ret;
                },
			},

	},
	update(diff) {
		player.dynas_sp.magic = Decimal.add(player.dynas_sp.magic, Decimal.mul(buyableEffect("dynas_sp", 11), diff))
		
	},  
	passiveGeneration(){
		if(hasMilestone("dynas_m",3))return 1;
		return 0;
	}
});


addLayer("dynas_t", {
	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0),
			elo: new Decimal(1000),
		}
	},

	layerShown() { return player.tm.buyables[9].gte(15) && player.tm.currentTree==9;},

	color: () => "#77FFAA",
	resource: "territories",
	row: 3,

	baseResource: "coins",
	baseAmount() { return player.dynas_c.points },
	branches: [["dynas_w", 2], ["dynas_c", 2]],

	requires: () => new Decimal("1e5000"),
	

	type: "static",
	base: new Decimal("1e300"),
	exponent: 1.5,
	symbol: "T",


	gainMult() {
		return new Decimal(1)
	},
	gainExp() {
		return new Decimal(1)
	},
	
		doReset(l){
			if(l=="dynas_c" || l=="dynas_wf"  || l=="dynas_b" || l=="dynas_sp" || l=="dynas_w" || l=="dynas_m" || l=="dynas_bd" || l=="dynas_t" || l=="dynas_so" || l=="dynas_wi" || !l.startsWith("dynas_")){return;}
			layerDataReset("dynas_t",["upgrades","milestones","challenges"]);
			return;
		},
	milestones: {
		0: {
			requirementDescription: () => "1 Territory",
			done() { return player[this.layer].best.gte(1) },
			effectDescription: () => "Unlock an obstacle and a banking. Also Dynas Spell 14 first effect is better."
		},
		1: {
			requirementDescription: () => "2 Territories",
			done() { return player[this.layer].best.gte(2) },
			effectDescription: () => "Unlock an obstacle."
		},
		2: {
			requirementDescription: () => "3 Territories",
			done() { return player[this.layer].best.gte(3) },
			effectDescription: () => "Unlock an obstacle. Workfinder Upgrade 11 and 21 are better. Also unlock a SP buyable."
		},
		3: {
			requirementDescription: () => "TDT Level 16",
			done() { return player.tm.buyables[9].gte(16) },
			effectDescription: () => "Unlock an obstacle."
		},
		4: {
			requirementDescription: () => "4 Territories",
			done() { return player[this.layer].best.gte(4) },
			effectDescription: () => "2nd SP buyable is cheaper."
		},
		5: {
			requirementDescription: () => "5 Territories",
			done() { return player[this.layer].best.gte(5) },
			effectDescription: () => "Obstacles can be completed another time."
		},
		6: {
			requirementDescription: () => "6 Territories",
			done() { return player[this.layer].best.gte(6) },
			effectDescription: () => "Unlock an obstacle."
		},
		7: {
			requirementDescription: () => "7 Territories",
			done() { return player[this.layer].best.gte(7) },
			effectDescription: () => "Territories boost dynas magic."
		},
		8: {
			requirementDescription: () => "8 Territories",
			done() { return player[this.layer].best.gte(8) },
			effectDescription: () => "Soldier requirement is lowered based on your territories."
		},
	},
			challenges: {
        rows: 3,
        cols: 2,
        11: {
            name:() => "The First Obstacle",
			challengeDescription(){
				return "Coin gain and dynas point generation is square rooted.<br>Completions: "+player.dynas_t.challenges[11]+"/"+this.completionLimit();
			},
			rewardDescription:() => "Builders build faster based on dynas points.",
			rewardEffect() {
				var eff = player.modpoints[9].add(1).log("1e30000").mul(player.dynas_bd.buyables[21].add(1)).add(1)
				if(player.dynas_t.challenges[11]>=2)eff = player.modpoints[9].add(1).log("1e10000").mul(player.dynas_bd.buyables[21].add(1)).add(1)
				if (player.dynas_t.challenges[22]>=1) eff = eff.mul(challengeEffect("dynas_t",22))
				if (player.dynas_t.challenges[32]>=1) eff = eff.mul(challengeEffect("dynas_t",32))
				return eff
			},
			rewardDisplay(){return "×" + format(challengeEffect("dynas_t",11))},
			goal:() => new Decimal(["e320","e740","e1000000"][player.dynas_t.challenges[11]]),
			currencyDisplayName: "dynas points",
                        currencyLayer: "modpoints",
                        currencyInternalName: "9",
			unlocked(){
                                return hasMilestone("dynas_t",0)
                        },
			completionLimit(){
				return hasMilestone("dynas_t",5) ? 2 : 1
			}
        },
        12: {
            name:() => "Unemployed Workfinders",
			challengeDescription(){
				return "You can not gain workfinders.<br>Completions: "+player.dynas_t.challenges[12]+"/"+this.completionLimit();
			},
			rewardDescription:() => "Find and finish work faster based on dynas points.",
			rewardEffect() {
				var eff = player.modpoints[9].add(1).log("1e1000").mul(player.dynas_bd.buyables[21].add(1)).add(1)
				if(player.dynas_t.challenges[12]>=2)eff = player.modpoints[9].add(1).log("1e100").mul(player.dynas_bd.buyables[21].add(1)).add(1)
				if (player.dynas_t.challenges[22]>=1) eff = eff.mul(challengeEffect("dynas_t",22))
				if (player.dynas_t.challenges[32]>=1) eff = eff.mul(challengeEffect("dynas_t",32))
				return eff
			},
			rewardDisplay(){return "×" + format(challengeEffect("dynas_t",12))},
			goal:() => new Decimal(["e8e3","e11400","e1000000"][player.dynas_t.challenges[12]]),
			currencyDisplayName: "dynas points",
                        currencyLayer: "modpoints",
                        currencyInternalName: "9",
			unlocked(){
                                return hasMilestone("dynas_t",1)
                        },
			completionLimit(){
				return hasMilestone("dynas_t",5) ? 2 : 1
			}

        },
        21: {
            name:() => "Market Crash",
			challengeDescription(){
				return "You can not gain workfinders and banks, bankings has no effect.<br>Completions: "+player.dynas_t.challenges[21]+"/"+this.completionLimit();
			},
			rewardDescription(){
				if(player.dynas_t.challenges[21]>=2)return "Unlock 2 bankings.";
				return "Unlock a banking, and generate 10 of this banking per second."
			},
			goal:() => new Decimal(["e4800","e7100","e1000000"][player.dynas_t.challenges[21]]),
			currencyDisplayName: "dynas points",
                        currencyLayer: "modpoints",
                        currencyInternalName: "9",
			unlocked(){
                                return hasMilestone("dynas_t",2)
                        },
			completionLimit(){
				return hasMilestone("dynas_t",5) ? 2 : 1
			}

        },
        22: {
            name:() => "From Square One",
			challengeDescription(){
				return "You can not gain workers, workfinders, spiritual power and banks, bankings has no effect.<br>Completions: "+player.dynas_t.challenges[22]+"/"+this.completionLimit();
			},
			rewardDescription:() => "Boost the first two obstacles' buffs based on your total territory count.",
			rewardEffect() {
				let eff = player.dynas_t.best.add(1).sqrt();
				if(player.dynas_t.challenges[22]>=2)eff = player.dynas_t.best.add(1);
				return eff
			},
			rewardDisplay(){return "×" + format(challengeEffect("dynas_t",22))},
			countsAs: [12, 21],
			goal:() => new Decimal(["e1000","e1340","e1000000"][player.dynas_t.challenges[22]]),
			currencyDisplayName: "dynas points",
                        currencyLayer: "modpoints",
                        currencyInternalName: "9",
			unlocked(){
                                return hasMilestone("dynas_t",3)
                        },
			completionLimit(){
				return hasMilestone("dynas_t",5) ? 2 : 1
			}
        },
        31: {
            name:() => "Unspendable Coins",
			challengeDescription(){
				return "“From Square One” and “Time Banking”'s debuff are applied at once.<br>Completions: "+player.dynas_t.challenges[31]+"/"+this.completionLimit();
			},
			rewardDescription(){
				if(player.dynas_t.challenges[21]>=2)return "Unlock a new spiritual power rebuyable upgrade, roads boost dynas magic.";
				return "Unlock a new spiritual power rebuyable upgrade."
			},
			countsAs: [12, 21, 22],
			goal:() => new Decimal([2**128,"1e42","e1000000"][player.dynas_t.challenges[31]]),
			currencyDisplayName: "dynas points",
                        currencyLayer: "modpoints",
                        currencyInternalName: "9",
			unlocked(){
                                return hasMilestone("dynas_t",6)
                        },
			completionLimit(){
				return hasMilestone("dynas_t",5) ? 2 : 1
			},
			onEnter(){
				updateTemp();updateTemp();updateTemp();updateTemp();updateTemp();
			}
        },
},

});


addLayer("dynas_so", {
	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0),
			totalDmg: new Decimal(0),
		}
	},

	layerShown() { return player.tm.buyables[9].gte(17) && player.tm.currentTree==9;},

	color: () => "#009900",
	resource: "soldiers",
	row: 3,
	symbol: "SO",

	baseResource: "coins",
	baseAmount() { return player.dynas_c.points },
	branches: [["dynas_w", 1], ["dynas_c", 2]],

	requires(){
		if(player.dynas_t.points.gte(8))return new Decimal("1e7500").pow(Decimal.pow(0.99, player.dynas_t.points));
		return new Decimal("1e7500")
	},

	type: "static",
	base: "1e30",
	exponent: 0.9,
	canBuyMax: () => true,
	//resetsNothing: () => hasMilestone("t", 6),
	
	effect() {
		let actualRat = Decimal.add(tmp.dynas_so.getRating, 1)
		let eff = actualRat.pow(15).mul(actualRat.log(10).add(1).pow(5)).mul(player.dynas_so.totalDmg.add(1))
		return eff
	},

	gainMult() {
		let ret=new Decimal(1)
		if(hasMilestone("dynas_so",5))ret = ret.div(player.dynas_so.totalDmg.add(1).pow(2));
		return ret;
	},
	gainExp() {
		return new Decimal(1)
	},
	buyables: {
		rows: 1,
		cols: 3,
		11: {
			title: () => "Strength",
			cost(x) {
				if(hasMilestone("dynas_so",6))return Decimal.pow(1e30, x)
				if (x.gte(100)) x = x.pow(2).div(100)
				if (x.gte(50)) x = x.pow(2).div(50)
				if (x.gte(20)) x = x.pow(2).div(20)
				if (x.gte(10)) x = x.pow(2).div(10)
				let cost = Decimal.mul(hasMilestone("dynas_so",4)?"e6500":"e7510", Decimal.pow(1e30, x))
				return cost.floor()
			},
			effect(x) { 
				if(hasMilestone("dynas_so",8))return x.add(1).mul(player.dynas_bd.buyables[23].max(5));
				if(hasMilestone("dynas_so",7))return x.add(1).mul(5);
				return x.add(5)
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return "Base stat: " + format(data.effect) + "\n\
				Cost: " + format(data.cost) + " coins\n\
				Increase your soldiers' attack power."
			},
			unlocked() { return player.dynas_so.unlocked },
			canAfford() {
				return player.dynas_c.points.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				cost = tmp[this.layer].buyables[this.id].cost
				player.dynas_c.points = player.dynas_c.points.sub(cost)
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
			},
			style() {
				return {
					"height": "200px"
				}
			}
		},
		12: {
			title: () => "Endurance",
			cost(x) {
				if(hasMilestone("dynas_so",6))return Decimal.pow(1e50, x)
				if (x.gte(100)) x = x.pow(2).div(100)
				if (x.gte(50)) x = x.pow(2).div(50)
				if (x.gte(20)) x = x.pow(2).div(20)
				if (x.gte(10)) x = x.pow(2).div(10)
				let cost = Decimal.mul(hasMilestone("dynas_so",4)?"e7000":"e7550", Decimal.pow(1e50, x))
				return cost.floor()
			},
			effect(x) { 
				if(hasMilestone("dynas_so",8))return x.add(1).mul(player.dynas_bd.buyables[23].max(5));
				if(hasMilestone("dynas_so",7))return x.add(1).mul(5);
				return x.add(5)
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return "Base stat: " + format(data.effect) + "\n\
				Cost: " + format(data.cost) + " coins\n\
				Increase your soldiers' max hit points."
			},
			unlocked() { return player.dynas_so.unlocked },
			canAfford() {
				return player.dynas_c.points.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				cost = tmp[this.layer].buyables[this.id].cost

				player.dynas_c.points = player.dynas_c.points.sub(cost)
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
			},
			style() {
				return {
					"height": "200px"
				}
			}

		},
		13: {
			title: () => "Dexterity",
			cost(x) {
				if(hasMilestone("dynas_so",6))return Decimal.pow(1e80, x)
				if (x.gte(100)) x = x.pow(2).div(100)
				if (x.gte(50)) x = x.pow(2).div(50)
				if (x.gte(20)) x = x.pow(2).div(20)
				if (x.gte(10)) x = x.pow(2).div(10)
				let cost = Decimal.mul(hasMilestone("dynas_so",4)?"e7500":"e7600", Decimal.pow(1e80, x))
				return cost.floor()
			},
			effect(x) { 
				if(hasMilestone("dynas_so",8))return x.add(1).mul(player.dynas_bd.buyables[23].max(5));
				if(hasMilestone("dynas_so",7))return x.add(1).mul(5);
				return x.add(5)
			},
			display() { // Everything else displayed in the buyable button after the title
				let data = tmp[this.layer].buyables[this.id]
				return "Base stat: " + format(data.effect) + "\n\
				Cost: " + format(data.cost) + " coins\n\
				Increase your soldiers' speeds."
			},
			unlocked() { return player.dynas_so.unlocked },
			canAfford() {
				return player.dynas_c.points.gte(tmp[this.layer].buyables[this.id].cost)
			},
			buy() {
				cost = tmp[this.layer].buyables[this.id].cost

				player.dynas_c.points = player.dynas_c.points.sub(cost)
				player[this.layer].buyables[this.id] = player[this.layer].buyables[this.id].add(1)
			},
			style() {
				return {
					"height": "200px"
				}
			}

		},
	},
	getRating(){
		let rat = player.dynas_so.points
		for (let x = 10; x <= 10; x += 10) for (let y = x + 1; y <= x + 3; y++) {
				rat = rat.mul(buyableEffect("dynas_so",y)).div(5)
			}
		return rat;
	},
	soldierPower(){
		return player.dynas_so.points.mul(buyableEffect("dynas_so",11));
	},
	soldierHP(){
		return player.dynas_so.points.mul(buyableEffect("dynas_so",12)).mul(5);
	},
	soldierSPD(){
		return player.dynas_so.points.mul(buyableEffect("dynas_so",13)).div(5);
	},
	soldierDPS(){
		let dps= player.dynas_so.points.pow(hasMilestone("dynas_so",2) ? 4 : 3.2).mul(buyableEffect("dynas_so",11)).mul(buyableEffect("dynas_so",12).pow(0.5)).mul(buyableEffect("dynas_so",13));
		if(hasMilestone("dynas_so",1))dps = dps.mul(player.dynas_bd.buyables[23].add(1));
		if(hasMilestone("dynas_so",3))dps = dps.mul(player.points.add(10).log10().div(3e15).pow(200).mul(10).add(1));
		if(hasUpgrade("dynas_sp",23))dps = dps.mul(upgradeEffect("dynas_sp",23));
		return dps;
	},
	tabFormat:{"Main Tab":
		{"content":["main-display",
			"prestige-button",
			["blank", "5px"],
			"resource-display",
			["display-text",
				function () { return "Your current military rating is " + format(tmp.dynas_so.getRating) + ", which is boosting your dynas point generation speed by ×" + format(layers.dynas_so.effect()) + "." }],
			["blank", "5px"],
			["display-text",
				function () { return player.dynas_so.unlocked ? "<h3>Soldier Statistics</h3><br/><h5>Accounts for all soldiers</h5>" : "" }],
			["blank", "5px"],
			["row", [
				["display-text",
					function () { return (player.dynas_so.unlocked ?  
						"Base Power: " + formatWhole(tmp.dynas_so.soldierPower).padEnd(15, '\u00A0')
						: "") }],
				["display-text",
					function () { return (player.dynas_so.unlocked ?  
						"Max Health: " + formatWhole(tmp.dynas_so.soldierHP).padEnd(15, '\u00A0')
						: "") }],
				["display-text",
					function () { return (player.dynas_so.unlocked ?
						"Attack Speed: " + formatWhole(tmp.dynas_so.soldierSPD).padEnd(15, '\u00A0')
						: "") }],
						
			]],["display-text",
					function () { return (player.dynas_so.unlocked ?  
						"Damage Per Second: " + formatWhole(tmp.dynas_so.soldierDPS)
						: "") }],
			["blank", "5px"],
			["display-text",
				function () { return player.dynas_so.unlocked ? "<h3>Soldier Attributes</h3>" : "" }],
			"buyables",
			"milestones"]},
	"The Guardian":{"content":["main-display",["display-text",function () { return "Damage Per Second: " + formatWhole(tmp.dynas_so.soldierDPS) }],
		["display-text",function () { return "Your soldiers dealt " + formatWhole(player.dynas_so.totalDmg) + " damage to the guardian." }],
		["display-text",function () { return "Boosting military rating effect by " + formatWhole(player.dynas_so.totalDmg.add(1)) + "x" }],
		["display-text",function () { if(hasMilestone("dynas_so",5))return "Dividing soldier price by " + formatWhole(player.dynas_so.totalDmg.add(1).pow(2));return ""; }]
],"unlocked":function(){return hasMilestone("dynas_so",0)}}
},
/*
	hotkeys: [
		{ key: "o", desc: "O: Recruit soldiers", onPress() { doReset(this.layer) } },
	],*/

		doReset(l){
			if(l=="dynas_c" || l=="dynas_wf"  || l=="dynas_b" || l=="dynas_sp" || l=="dynas_w" || l=="dynas_m" || l=="dynas_bd" || l=="dynas_t" || l=="dynas_so" || l=="dynas_wi" || !l.startsWith("dynas_")){return;}
			layerDataReset("dynas_so",["upgrades","milestones","challenges"]);
			return;
		},
	milestones: {
		0: {
			requirementDescription: () => "1 Soldier",
			done() { return player[this.layer].best.gte(1) },
			effectDescription: () => "Unlock the guardian of the Multitree."
		},
		1: {
			requirementDescription: () => "2 Soldiers",
			done() { return player[this.layer].best.gte(2) },
			effectDescription: () => "Military Bases boost DPS."
		},
		2: {
			requirementDescription: () => "30 Soldiers",
			done() { return player[this.layer].best.gte(30) },
			effectDescription: () => "Soldiers boost DPS at an increased rate."
		},
		3: {
			requirementDescription: () => "40 Soldiers",
			done() { return player[this.layer].best.gte(40) },
			effectDescription: () => "Points boost DPS."
		},
		4: {
			requirementDescription: () => "50 Soldiers",
			done() { return player[this.layer].best.gte(50) },
			effectDescription: () => "Soldier Attributes are cheaper."
		},
		5: {
			requirementDescription: () => "60 Soldiers",
			done() { return player[this.layer].best.gte(60) },
			effectDescription: () => "Soldier didn't reset anything. Auto-recruit soldiers. The guardian also provide a second effect."
		},
		6: {
			requirementDescription: () => "100 Soldiers",
			done() { return player[this.layer].best.gte(100) },
			effectDescription: () => "Soldier Attributes are cheaper, and autobuy them."
		},
		7: {
			requirementDescription: () => "150 Soldiers",
			done() { return player[this.layer].best.gte(150) },
			effectDescription: () => "Soldier Attributes are better."
		},
		8: {
			requirementDescription: () => "300 Soldiers",
			done() { return player[this.layer].best.gte(300) },
			effectDescription: () => "Military Bases boost Soldier Attributes."
		},
	},
	update(diff){
		player.dynas_so.totalDmg = player.dynas_so.totalDmg.add(tmp.dynas_so.soldierDPS.mul(diff)).min(Number.MAX_VALUE);
		if(hasMilestone("dynas_so",6)){
			let t = player.dynas_c.points.add(10).log10();
			player.dynas_so.buyables[11] = player.dynas_so.buyables[11].max(t.div(30).add(1).floor());
			player.dynas_so.buyables[12] = player.dynas_so.buyables[12].max(t.div(50).add(1).floor());
			player.dynas_so.buyables[13] = player.dynas_so.buyables[13].max(t.div(80).add(1).floor());
		}
	},
resetsNothing: () => hasMilestone("dynas_so",5),
autoPrestige: () => hasMilestone("dynas_so",5),
})


addLayer("dynas_wi", {
	startData() {
		return {
			unlocked: false,
			points: new Decimal(0),
			best: new Decimal(0),
			total: new Decimal(0),
			knowledge: new Decimal(0),
		}
	},

	layerShown() { return player.tm.buyables[9].gte(18) && player.tm.currentTree==9;},

	color: () => "#0077ff",
	name: "wisdom",
	resource: "wisdom",
	row: 3,
	symbol: "WI",

	baseResource: "spiritual power",
	baseAmount() { return player.dynas_sp.points },
	branches: [["dynas_w", 3], ["dynas_sp", 3]],


	requires: () => {
		let req = new Decimal("1e100")
		return req
	},

	type: "static",
	base: () => 1e10,
	exponent: () => 3,
	canBuyMax: () => true,


	effect() {
		var ret = Decimal.pow(2, Decimal.pow(player.dynas_wi.points, 1.05)).sub(1)
		return ret
	},
	
	effectDescription() {
		return "which are generating " + format(tmp.dynas_wi.effect) + " knowledge per second"
	},
	
	
	gainMult() {
		return new Decimal(1)
	},
	gainExp() {
		return new Decimal(1)
	},
	
	update(diff) {
		player.dynas_wi.knowledge = Decimal.add(player.dynas_wi.knowledge, tmp.dynas_wi.effect.mul(diff))
	},
	

	tabFormat:
		["main-display",
			"prestige-button",
			"resource-display",
			["display-text",
				function () { return "You have " + format(player.dynas_wi.knowledge, 0) + " knowledge." }],
			"upgrades"
		],
		doReset(l){
			if(l=="dynas_c" || l=="dynas_wf"  || l=="dynas_b" || l=="dynas_sp" || l=="dynas_w" || l=="dynas_m" || l=="dynas_bd" || l=="dynas_t" || l=="dynas_so" || l=="dynas_wi" || !l.startsWith("dynas_")){return;}
			layerDataReset("dynas_wi",["upgrades","milestones","challenges"]);
			return;
		},
		upgrades: {
            rows: 2,
            cols: 5,
			11: {
                description() {
					return "Knowledge boost first 4 coin upgrades."
				},
                cost: new Decimal(1),
		currencyDisplayName: "knowledge",
		currencyInternalName: "knowledge",
		currencyLayer: "dynas_wi",
                unlocked() { return true; }, // The upgrade is only visible when this is true
				effect() {
					let ret = player.dynas_wi.knowledge.add(1).pow(2);
                    return ret;
                },
	}
},
})

