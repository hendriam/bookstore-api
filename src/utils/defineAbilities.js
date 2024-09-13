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
        can('create', 'Address');
        can('update', 'Address', { user: user.id });
        can('delete', 'Address', { user: user.id });
    }

    return build();
}

module.exports = defineAbilities;
