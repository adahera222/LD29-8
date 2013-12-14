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

/*
* Used for creating game data when the game is loaded
*/
function init(){
	test();
}

/*
* Dynamically generate the UI
*/
$(document).ready(function(){

	var containerDiv = $('.container');
	for(var index = 0; index < candidates.length; index++){	
		var candidate = candidates[index];
		var candidateDiv = $('<div class="candidate-container"></div>');
		
		var candidateName = $('<p class="candidate-name"></p>');
		$(candidateName).text(candidate.name);
		var candidateLocation = $('<p class="candidate-location></p>">');
		$(candidateLocation).text(candidate.location);
		var candidateParty = $('<p class="candidate-party"></p>');
		$(candidateParty).text(candidate.party);
		var policyHeader = $('<h3 class="policy-header">Policies</h3>');

		candidateDiv.append(candidateName);
		candidateDiv.append(candidateLocation);
		candidateDiv.append(candidateParty);
		candidateDiv.append(policyHeader);

		for(var pIndex = 0; pIndex < candidate.policies.length; pIndex++){
			var policy = candidate.policies[pIndex];
			
			var policyTitle = $('<p class="policy-title"></p>');
			policyTitle.text(policy.title);
			candidateDiv.append(policyTitle);

			var policyEffects = $('<p class="policy-effects"></p>');
			var totalCitizens = citizens.length;
			var posEffect = (policy.getPeoplePositivelyAffected() / totalCitizens) * 100;
			var negEffect = (policy.getPeopleNegativelyAffected() / totalCitizens) * 100;
			var percentEffected = negEffect + posEffect;
			posEffect = posEffect.toFixed(2);
			negEffect = negEffect.toFixed(2);
			percentEffected = percentEffected.toFixed(2);
			$(policyEffects).text(percentEffected + "% of the population is effected by this policy. Of these people " + posEffect + "% positively and " + negEffect + "% negatively.")
			candidateDiv.append(policyEffects);
		}

		containerDiv.append(candidateDiv);
	}

	//After everything is done
	$('.REMOVE-AFTER-LOAD').remove();
});

function test(){
	citizens.push(new Citizen("t1", ["good"]));
	citizens.push(new Citizen("t2", ["bad"]));
	citizens.push(new Citizen("t3", ["good"]));
	candidates.push(new Candidate("Senator Poopy Head", "Mars", "Toilet party", [new Policy("Test policy", "good", "bad"), new Policy("Test policy 2", "bad", "good")]));
	candidates.push(new Candidate("Mayor Poopy Head", "Mars", "Toilet party", [new Policy("Test policy", "good", "bad"), new Policy("Test policy 2", "bad", "good")]));
}