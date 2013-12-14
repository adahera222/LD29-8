var citizens = [];
var candidates = [];

function Citizen(party, attributes){
	this.party = party;
	this.attributes = attributes;
}

Citizen.prototype.hasAttribute = function(name){
	var index = this.attributes.indexOf(name);
	if(index == -1){
		return false; 
	}
	else{
		return true;
	}
}

function Policy(title, positiveAffectedAttribute, negativeAffectedAttribute){
	this.title = title;
	this.positiveAffectedAttribute = positiveAffectedAttribute;
	this.negativeAffectedAttribute = negativeAffectedAttribute;
}

Policy.prototype.getPeoplePositivelyAffected = function(){
	var total = 0;
	for(var index = 0; index < citizens.length; index++){
		var citizen = citizens[index];
		if(citizen.hasAttribute(this.positiveAffectedAttribute)){
			total++;
		}
	}
	return total;
}

Policy.prototype.getPeopleNegativelyAffected = function(){
	var total = 0;
	for(var index = 0; index < citizens.length; index++){
		var citizen = citizens[index];
		if(citizen.hasAttribute(this.negativeAffectedAttribute)){
			total++;
		}
	}
	return total;
}

function Candidate(name, location, party, policies){
	this.name = name;
	this.location = location;
	this.party = party;
	this.policies = policies;
}

function init(){
	test();
}

$(document).ready(function(){
	for(var index = 0; index < candidates.length; index++){
/*		var candidate = candidates[index];
		$('.container').append('<div class="candidate-container"></div>');
		var div = $('.container').last();
		console.log(div);
		$(div).append('<p class=".candidate-name">Hi</p>');*/
	}
});

function test(){
	citizens.push(new Citizen("t1", ["good"]));
	citizens.push(new Citizen("t2", ["bad"]));
	citizens.push(new Citizen("t3", ["good"]));
	candidates.push(new Candidate("Senator Poopy Head", "Mars", "Toilet party", [new Policy("Test policy", "good", "bad"), new Policy("Test policy 2", "bad", "good")]));
}