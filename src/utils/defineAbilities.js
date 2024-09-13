const { AbilityBuilder, createMongoAbility } = require('@casl/ability');

function defineAbilities(user) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (user.role === 'admin') {
        can('manage', 'all');
    } else {
        can('read', 'Product');
        can('read', 'Category');
        can('read', 'Tags');
        can('read', 'Address');
    }

    return build();
}

module.exports = defineAbilities;
