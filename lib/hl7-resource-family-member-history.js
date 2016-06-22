
// create the object using our BaseModel
FamilyMemberHistory = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
FamilyMemberHistory.prototype._collection = FamilyMemberHistories;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
FamilyMemberHistories = new Mongo.Collection('FamilyMemberHistories');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
FamilyMemberHistories._transform = function (document) {
  return new FamilyMemberHistory(document);
};


if (Meteor.isClient){
  Meteor.subscribe("FamilyMemberHistories");
}

if (Meteor.isServer){
  Meteor.publish("FamilyMemberHistories", function (argument){
    if (this.userId) {
      return FamilyMemberHistories.find();
    } else {
      return [];
    }
  });
}


FamilyMemberHistorySchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "FamilyMemberHistory"
  },

  "identifier" : {
    optional: true,
    type: [IdentifierSchema]
  }, // External Id(s) for this record
  "patient" : {
    optional: true,
    type: ReferenceSchema
  }, // R!  Patient history is about
  "date" : {
    optional: true,
    type: Date
  }, // When history was captured/updated
  "status" : {
    optional: true,
    type: Code
  }, // R!  partial | completed | entered-in-error | health-unknown
  "name" : {
    optional: true,
    type: String
  }, // The family member described
  "relationship" : {
    optional: true,
    type: CodeableConceptSchema
  }, // R!  Relationship to the subject
  "gender" : {
    optional: true,
    type: Code
  }, // male | female | other | unknown
  "bornPeriod" : {
    optional: true,
    type: PeriodSchema
  },
  "bornDate" : {
    optional: true,
    type: Date
  },
  "bornString" : {
    optional: true,
    type: String
  },
  "ageQuantity" : {
    optional: true,
    type: QuantitySchema
  },
  "ageRange" : {
    optional: true,
    type: RangeSchema
  },
  "ageString" : {
    optional: true,
    type: String
  },
  "deceasedBoolean" : {
    optional: true,
    type: Boolean
  },
  "deceasedQuantity" : {
    optional: true,
    type: QuantitySchema
  },
  "deceasedRange" : {
    optional: true,
    type: RangeSchema
  },
  "deceasedDate" : {
    optional: true,
    type: Date
  },
  "deceasedString" : {
    optional: true,
    type: String
  },
  "note" : {
    optional: true,
    type: AnnotationSchema
  }, // General note about related person
  "condition.$.code" : {
    optional: true,
    type: CodeableConceptSchema
  }, // R!  Condition suffered by relation
  "condition.$.outcome" : {
    optional: true,
    type: CodeableConceptSchema
  }, // deceased | permanent disability | etc.
  "condition.$.onsetQuantity" : {
    optional: true,
    type: QuantitySchema
  },
  "condition.$.onsetRange" : {
    optional: true,
    type: RangeSchema
  },
  "condition.$.onsetPeriod" : {
    optional: true,
    type: PeriodSchema
  },
  "condition.$.onsetString" : {
    optional: true,
    type: String
  },
  "condition.$.note" : {
    optional: true,
    type: AnnotationSchema
  } // Extra information about condition
});
FamilyMemberHistories.attachSchema(FamilyMemberHistorySchema);
